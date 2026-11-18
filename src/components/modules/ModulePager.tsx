import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { getAdjacentModules, getModulePath, type EducationalModule } from '../../data/modules.ts'

interface ModulePagerProps {
  educationalModule: EducationalModule
}

const pagerLinkClassName =
  'flex items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-sm transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

export function ModulePager({ educationalModule }: ModulePagerProps) {
  const { previousModule, nextModule } = getAdjacentModules(educationalModule)

  return (
    <nav aria-label="Navegação entre módulos" className="mt-6 grid gap-3 sm:grid-cols-2">
      {previousModule && (
        <Link to={getModulePath(previousModule)} className={pagerLinkClassName}>
          <ChevronLeft aria-hidden="true" className="size-5 shrink-0 text-brand" />
          <span className="flex min-w-0 flex-col">
            <span className="text-sm text-slate-600">Módulo anterior</span>
            <span className="font-semibold text-ink">{previousModule.title}</span>
          </span>
        </Link>
      )}
      {nextModule && (
        <Link
          to={getModulePath(nextModule)}
          className={`${pagerLinkClassName} justify-end text-right sm:col-start-2`}
        >
          <span className="flex min-w-0 flex-col">
            <span className="text-sm text-slate-600">Próximo módulo</span>
            <span className="font-semibold text-ink">{nextModule.title}</span>
          </span>
          <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-brand" />
        </Link>
      )}
    </nav>
  )
}
