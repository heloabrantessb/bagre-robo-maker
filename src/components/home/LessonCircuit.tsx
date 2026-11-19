import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { educationalModules, getModulePath } from '../../data/modules.ts'

// Converte "#rrggbb" em rgba para o brilho do pino aceso.
function toRgba(hexColor: string, alpha: number): string {
  const value = Number.parseInt(hexColor.slice(1), 16)
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`
}

// "O circuito da aula": os cinco módulos ligados em série na protoboard, do trilho + ao trilho −.
// No computador o circuito corre da esquerda para a direita; no celular e no tablet, de cima para baixo.
// A ordem no HTML é a ordem da aula.
export function LessonCircuit() {
  return (
    <section aria-labelledby="titulo-circuito" className="mt-10">
      <h2 id="titulo-circuito" className="font-display text-[1.75rem] leading-tight font-bold">
        O circuito da aula
      </h2>
      <p className="mt-1 text-[17px] text-ink-soft">
        <span className="lg:hidden">Siga os módulos de cima para baixo.</span>
        <span className="hidden lg:inline">Siga os módulos da esquerda para a direita, do + ao −.</span>
      </p>

      <div className="protoboard relative mt-4 rounded-[22px] border border-hole py-6 pr-3.5 pl-9 lg:px-6 lg:py-8">
        {/* Trilhas de alimentação: verticais à esquerda no celular, horizontais no computador. */}
        <span
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-3 w-[3px] rounded-full bg-rail-plus lg:top-3.5 lg:right-6 lg:bottom-auto lg:left-6 lg:h-1 lg:w-auto"
        />
        <span
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-5 w-[3px] rounded-full bg-rail-minus lg:top-auto lg:right-6 lg:bottom-3.5 lg:left-6 lg:h-1 lg:w-auto"
        />
        <span aria-hidden="true" className="absolute top-1.5 left-4 hidden bg-board px-1 font-display text-lg leading-none font-extrabold text-rail-plus lg:block">
          +
        </span>
        <span aria-hidden="true" className="absolute right-4 bottom-1.5 hidden bg-board px-1 font-display text-lg leading-none font-extrabold text-rail-minus lg:block">
          −
        </span>

        <ol className="relative grid gap-3.5 lg:grid-cols-5 lg:gap-[18px]">
          {educationalModules.map((educationalModule, index) => {
            const isFirst = index === 0
            const isLast = index === educationalModules.length - 1
            const { fill, onFill, accent, wire } = educationalModule.colors

            return (
              <li key={educationalModule.id} className="relative flex gap-3 lg:flex-col lg:gap-0">
                <div aria-hidden="true" className="relative shrink-0 pt-2.5 lg:flex lg:h-16 lg:w-full lg:items-center lg:pt-0">
                  {isFirst && (
                    <>
                      {/* Jumper que leva a corrente do trilho + ao primeiro módulo. */}
                      <span className="absolute -top-5 left-[25px] hidden h-7 w-1.5 rounded-full bg-rail-plus lg:block" />
                      <span className="absolute -top-4 left-[70px] hidden text-sm font-bold whitespace-nowrap text-rail-plus lg:block">
                        Comece aqui
                      </span>
                    </>
                  )}
                  {!isLast && (
                    <span
                      className="absolute top-8 -bottom-7 left-1/2 -ml-[3px] w-1.5 rounded-full lg:top-1/2 lg:-right-6 lg:bottom-auto lg:left-7 lg:-mt-[3px] lg:ml-0 lg:h-1.5 lg:w-auto"
                      style={{ backgroundColor: wire }}
                    />
                  )}
                  <span
                    className="relative z-10 flex size-12 items-center justify-center rounded-full border-4 bg-white font-display text-xl font-extrabold text-ink lg:size-14 lg:text-2xl"
                    style={
                      isFirst
                        ? {
                            backgroundColor: fill,
                            borderColor: fill,
                            color: onFill,
                            boxShadow: `0 0 0 4px #ffffff, 0 0 0 8px ${wire}, 0 0 22px 8px ${toRgba(fill, 0.45)}`,
                          }
                        : { borderColor: wire }
                    }
                  >
                    {educationalModule.id}
                  </span>
                </div>

                <div
                  className="relative flex min-w-0 flex-1 flex-col rounded-[14px] border border-t-[6px] border-hole bg-white p-4 transition-shadow hover:shadow-md has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-rail-minus lg:mt-3.5"
                  style={{ borderTopColor: wire }}
                >
                  {isFirst && (
                    <p className="mb-2 self-start rounded-full bg-rail-plus px-2.5 py-0.5 text-sm font-bold text-white lg:hidden">
                      Comece aqui
                    </p>
                  )}
                  <p className="text-[15px] font-bold" style={{ color: accent }}>
                    Módulo {educationalModule.id}
                    <span className="sr-only">:</span>
                  </p>
                  <h3 className="mt-1 font-display text-xl leading-tight font-bold">
                    {/* O pseudo-elemento estende a área clicável do link para o cartão inteiro. */}
                    <Link
                      to={getModulePath(educationalModule)}
                      className="after:absolute after:inset-0 after:rounded-[14px] focus-visible:outline-none"
                    >
                      {educationalModule.title}
                    </Link>
                  </h3>
                  <ul aria-label="Objetivos" className="mt-3 grid gap-2 text-[15.5px] leading-snug text-ink-soft">
                    {educationalModule.objectives.map((objective) => (
                      <li key={objective} className="flex gap-2">
                        <span aria-hidden="true" className="mt-[7px] size-2 shrink-0 rounded-full" style={{ backgroundColor: wire }} />
                        {objective}
                      </li>
                    ))}
                  </ul>
                  <span aria-hidden="true" className="mt-auto flex items-center gap-1 pt-3.5 font-bold" style={{ color: accent }}>
                    Abrir módulo
                    <ChevronRight className="size-5" />
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
