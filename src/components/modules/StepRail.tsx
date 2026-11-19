import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import type { EducationalModule } from '../../data/modules.ts'

interface StepRailProps {
  educationalModule: EducationalModule
  currentIndex: number
  onSelectStep: (index: number) => void
  // "sidebar": barra lateral completa (computador); "inline": tira compacta abaixo do título (celular).
  variant: 'sidebar' | 'inline'
}

// Converte "#rrggbb" em rgba para o brilho do LED aceso.
function toRgba(hexColor: string, alpha: number): string {
  const value = Number.parseInt(hexColor.slice(1), 16)
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`
}

// Tira de protoboard com os passos do módulo, ligados por um jumper; o passo atual é o LED aceso.
export function StepRail({ educationalModule, currentIndex, onSelectStep, variant }: StepRailProps) {
  const { fill, onFill, wire } = educationalModule.colors
  const isSidebar = variant === 'sidebar'
  const ledSize = isSidebar ? 'size-10 text-base' : 'size-9 text-[15px]'

  return (
    <nav
      aria-label={`Passos do Módulo ${educationalModule.id}`}
      className={`protoboard relative rounded-2xl border border-hole ${isSidebar ? 'py-7 pr-6 pl-10' : 'py-3.5 pr-3.5 pl-8'}`}
    >
      {/* Trilhas de alimentação da protoboard: + (vermelha) e − (azul). */}
      <span aria-hidden="true" className={`absolute top-4 bottom-4 w-[3px] rounded-full bg-rail-plus ${isSidebar ? 'left-3' : 'left-2.5'}`} />
      <span aria-hidden="true" className={`absolute top-4 bottom-4 w-[3px] rounded-full bg-rail-minus ${isSidebar ? 'left-5' : 'left-[18px]'}`} />

      {isSidebar && (
        <>
          <Link
            to="/modulos"
            className="inline-flex min-h-11 items-center rounded-xl border border-hole bg-white px-4 font-semibold text-ink hover:border-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rail-minus"
          >
            Todos os módulos
          </Link>
          <h2 className="mt-7 font-display text-xl font-bold">Neste módulo</h2>
          <p className="mt-1 mb-5 text-[15px] text-slate-600">Siga os passos de cima para baixo.</p>
        </>
      )}

      <ol className="relative">
        {educationalModule.steps.length > 1 && (
          <span
            aria-hidden="true"
            className={`absolute w-1 rounded-full ${isSidebar ? 'top-6 bottom-6 left-[18px]' : 'top-5 bottom-5 left-4'}`}
            style={{ backgroundColor: wire }}
          />
        )}
        {educationalModule.steps.map((step, index) => {
          const isCurrent = index === currentIndex
          const ledStyle: CSSProperties = isCurrent
            ? {
                backgroundColor: fill,
                borderColor: fill,
                color: onFill,
                boxShadow: `0 0 0 4px var(--color-board), 0 0 0 7px ${wire}, 0 0 18px 6px ${toRgba(fill, 0.45)}`,
              }
            : { backgroundColor: '#ffffff', borderColor: wire }

          return (
            <li key={step.id} className="relative">
              <button
                type="button"
                onClick={() => onSelectStep(index)}
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex w-full cursor-pointer items-center gap-3.5 rounded-xl text-left text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rail-minus ${isSidebar ? 'min-h-16 py-1.5' : 'min-h-12 py-1'}`}
              >
                <span
                  aria-hidden="true"
                  className={`relative flex shrink-0 items-center justify-center rounded-full border-[3px] font-display font-extrabold ${ledSize}`}
                  style={ledStyle}
                >
                  {index + 1}
                </span>
                <span className={isCurrent ? 'font-bold' : 'font-semibold text-slate-700'}>
                  <span className="sr-only">Passo {index + 1}: </span>
                  {step.title}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
