import { useMemo } from 'react'
import { useParams } from 'react-router'
import { ModuleEndCard } from '../components/modules/ModuleEndCard.tsx'
import { StepBar } from '../components/modules/StepBar.tsx'
import { StepRail } from '../components/modules/StepRail.tsx'
import {
  findModuleBySlug,
  getModulePosition,
  getStepElementId,
  TOTAL_MODULES,
  type EducationalModule,
} from '../data/modules.ts'
import { useCurrentStep } from '../hooks/useCurrentStep.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

export function ModulePage() {
  const { moduleSlug } = useParams()
  const educationalModule = findModuleBySlug(moduleSlug)

  if (!educationalModule) {
    return <NotFoundPage />
  }

  // A chave reinicia o passo atual ao trocar de módulo.
  return <ModuleContent key={educationalModule.id} educationalModule={educationalModule} />
}

interface ModuleContentProps {
  educationalModule: EducationalModule
}

// Página de módulo: barra lateral de passos à esquerda e coluna de leitura com um h2 por passo.
// O conteúdo de cada passo será implementado em Issues próprias.
function ModuleContent({ educationalModule }: ModuleContentProps) {
  const stepElementIds = useMemo(
    () => educationalModule.steps.map((step) => getStepElementId(educationalModule, step)),
    [educationalModule],
  )
  const { currentIndex, goToStep } = useCurrentStep(stepElementIds)
  const { fill, onFill, accent } = educationalModule.colors
  const position = getModulePosition(educationalModule)

  return (
    <div>
      <title>{`Módulo ${educationalModule.id} — Bagre Robô Maker`}</title>

      <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="hidden lg:sticky lg:top-6 lg:block">
          <StepRail educationalModule={educationalModule} currentIndex={currentIndex} onSelectStep={goToStep} variant="sidebar" />
        </div>

        <div className="min-w-0 max-w-[46rem]">
          <p className="font-semibold" style={{ color: accent }}>
            Módulo {position} de {TOTAL_MODULES}
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-extrabold tracking-tight font-stretch-condensed">
            {educationalModule.title}
          </h1>

          <div className="mt-6 lg:hidden">
            <StepRail educationalModule={educationalModule} currentIndex={currentIndex} onSelectStep={goToStep} variant="inline" />
          </div>

          {educationalModule.steps.map((step, index) => {
            const elementId = stepElementIds[index]
            const headingId = `${elementId}-titulo`

            return (
              <section
                key={step.id}
                id={elementId}
                aria-labelledby={headingId}
                className="mt-12 scroll-mt-6 border-t border-hole pt-8 first-of-type:mt-10"
              >
                <h2
                  id={headingId}
                  tabIndex={-1}
                  className="flex items-baseline gap-3.5 font-display text-[clamp(1.6rem,3.5vw,2.15rem)] leading-tight font-bold focus:outline-none"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 translate-y-1.5 items-center justify-center rounded-full text-xl font-extrabold"
                    style={{ backgroundColor: fill, color: onFill }}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <span className="sr-only">Passo {index + 1}: </span>
                    {step.title}
                  </span>
                </h2>
                <p className="mt-5 rounded-xl border border-dashed border-slate-400 bg-white p-6 text-lg text-slate-700">
                  Conteúdo em preparação.
                </p>
              </section>
            )
          })}

          <ModuleEndCard educationalModule={educationalModule} />
        </div>
      </div>

      <StepBar
        educationalModule={educationalModule}
        currentIndex={currentIndex}
        onNextStep={() => goToStep(currentIndex + 1)}
      />
    </div>
  )
}
