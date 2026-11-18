import { Construction } from 'lucide-react'
import { useParams } from 'react-router'
import { ModulePager } from '../components/modules/ModulePager.tsx'
import { ModulePosition } from '../components/modules/ModulePosition.tsx'
import { ModuleSidebar } from '../components/modules/ModuleSidebar.tsx'
import { findModuleBySlug } from '../data/modules.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

// Página provisória: o conteúdo de cada módulo será implementado em Issues próprias.
export function ModulePage() {
  const { moduleSlug } = useParams()
  const educationalModule = findModuleBySlug(moduleSlug)

  if (!educationalModule) {
    return <NotFoundPage />
  }

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-6">
      <title>{`Módulo ${educationalModule.id} — Bagre Robô Maker`}</title>

      <ModuleSidebar currentModule={educationalModule} />

      <div className="min-w-0">
        <article className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Módulo {educationalModule.id}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{educationalModule.title}</h1>

          <ModulePosition educationalModule={educationalModule} />

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-dashed border-slate-400 bg-surface-muted p-5">
            <Construction aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand" />
            <div>
              <p className="font-semibold text-ink">Conteúdo em preparação</p>
              <p className="mt-1 text-slate-700">O conteúdo deste módulo ainda está sendo preparado.</p>
            </div>
          </div>
        </article>

        <ModulePager educationalModule={educationalModule} />
      </div>
    </div>
  )
}
