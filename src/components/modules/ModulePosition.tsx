import { getModulePosition, TOTAL_MODULES, type EducationalModule } from '../../data/modules.ts'

interface ModulePositionProps {
  educationalModule: EducationalModule
}

// Indicador estático da posição do módulo na sequência didática (RF11); não representa progresso do aluno.
export function ModulePosition({ educationalModule }: ModulePositionProps) {
  const position = getModulePosition(educationalModule)
  const percentage = (position / TOTAL_MODULES) * 100

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-slate-600">
        Módulo {position} de {TOTAL_MODULES}
      </p>
      <div aria-hidden="true" className="mt-2 h-2 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-brand" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
