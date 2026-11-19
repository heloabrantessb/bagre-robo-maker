import { useCallback, useEffect, useRef, useState } from 'react'

// Tempo em que o passo escolhido por clique prevalece sobre a detecção por rolagem.
const CLICK_LOCK_MS = 900

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Acompanha qual passo está em leitura (o mais alto dentro da faixa central da tela) e permite ir até um passo.
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

    const visibility = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibility.set(entry.target.id, entry.isIntersecting))

        if (Date.now() < lockedUntil.current) {
          return
        }

        const firstVisible = elementIds.findIndex((id) => visibility.get(id))
        if (firstVisible !== -1) {
          setCurrentIndex(firstVisible)
        }
      },
      { rootMargin: '-15% 0px -55% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
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
