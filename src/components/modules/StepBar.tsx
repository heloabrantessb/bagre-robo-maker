import { Link } from 'react-router'
import { getAdjacentModules, getModulePath, type EducationalModule } from '../../data/modules.ts'

interface StepBarProps {
  educationalModule: EducationalModule
  currentIndex: number
  onNextStep: () => void
}

// Barra inferior do celular: mostra o passo atual e leva ao próximo passo (ou ao próximo módulo).
export function StepBar({ educationalModule, currentIndex, onNextStep }: StepBarProps) {
  const totalSteps = educationalModule.steps.length
  const isLastStep = currentIndex >= totalSteps - 1
  const { nextModule } = getAdjacentModules(educationalModule)
  const buttonClassName =
    'inline-flex min-h-13 cursor-pointer items-center rounded-xl bg-ink px-5 text-[17px] font-bold text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rail-minus'

  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-10 flex items-center gap-3 border-t border-hole bg-white px-4 pt-3 pb-5 lg:hidden">
      <p className="flex-1 text-[15px] text-slate-700" aria-live="polite">
        Passo <strong className="text-ink">{currentIndex + 1}</strong> de {totalSteps}
      </p>
      {!isLastStep && (
        <button type="button" onClick={onNextStep} className={buttonClassName}>
          Próximo passo
        </button>
      )}
      {isLastStep && nextModule && (
        <Link to={getModulePath(nextModule)} className={buttonClassName}>
          Ir para o Módulo {nextModule.id}
        </Link>
      )}
      {isLastStep && !nextModule && (
        <Link to="/" className={buttonClassName}>
          Voltar à visão geral
        </Link>
      )}
    </div>
  )
}
