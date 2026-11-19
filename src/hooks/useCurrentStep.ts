import { useCallback, useEffect, useRef, useState } from 'react'

// Tempo em que o passo escolhido por clique prevalece sobre a detecção por rolagem.
const CLICK_LOCK_MS = 900
// Um passo passa a ser o atual quando o topo da sua seção sobe acima desta fração da altura da tela.
const READING_LINE = 0.35

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Índice do passo em leitura: o último cuja seção já passou da linha de leitura.
// No fim da página, o último passo visível, para que passos curtos no final também possam acender.
function findReadingIndex(elements: readonly HTMLElement[]): number {
  const viewportHeight = window.innerHeight
  const tops = elements.map((element) => element.getBoundingClientRect().top)
  let index = 0

  tops.forEach((top, position) => {
    if (top <= viewportHeight * READING_LINE) {
      index = position
    }
  })

  const root = document.documentElement
  const isScrollable = root.scrollHeight > viewportHeight + 2
  const isAtBottom = window.scrollY + viewportHeight >= root.scrollHeight - 2

  if (isScrollable && window.scrollY > 0 && isAtBottom) {
    tops.forEach((top, position) => {
      if (top < viewportHeight) {
        index = Math.max(index, position)
      }
    })
  }

  return index
}

// Acompanha qual passo está em leitura e permite ir até um passo.
// Com HashRouter não é possível usar âncoras "#id"; a rolagem e o foco são feitos por script.
export function useCurrentStep(elementIds: readonly string[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lockedUntil = useRef(0)

  useEffect(() => {
    const elements = elementIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) {
      return undefined
    }

    let frame = 0
    const update = () => {
      frame = 0
      if (Date.now() >= lockedUntil.current) {
        setCurrentIndex(findReadingIndex(elements))
      }
    }
    // Limita o cálculo a uma vez por quadro de animação.
    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.cancelAnimationFrame(frame)
    }
  }, [elementIds])

  const goToStep = useCallback(
    (index: number) => {
      const element = document.getElementById(elementIds[index] ?? '')
      if (!element) {
        return
      }

      lockedUntil.current = Date.now() + CLICK_LOCK_MS
      setCurrentIndex(index)
      element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
      // Move o foco para o título do passo, para leitores de tela e navegação por teclado.
      element.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
    },
    [elementIds],
  )

  return { currentIndex, goToStep }
}
