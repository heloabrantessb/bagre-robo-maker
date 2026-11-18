import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { getModulePath, type EducationalModule } from '../../data/modules.ts'

interface ModuleCardProps {
  educationalModule: EducationalModule
}

export function ModuleCard({ educationalModule }: ModuleCardProps) {
  return (
    <Link
      to={getModulePath(educationalModule)}
      className="group flex h-full items-center gap-4 rounded-xl border border-line bg-white p-4 shadow-sm transition hover:border-brand hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:p-5"
    >
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg font-bold text-brand"
      >
        {educationalModule.id}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold uppercase tracking-wide text-slate-600">
          Módulo {educationalModule.id}
          <span className="sr-only">:</span>
        </span>
        <span className="font-semibold text-ink">{educationalModule.title}</span>
      </span>
      <ChevronRight
        aria-hidden="true"
        className="size-5 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-brand"
      />
    </Link>
  )
}
