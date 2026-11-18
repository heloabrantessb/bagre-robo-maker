import { Link } from 'react-router'
import { educationalModules, getModulePath, type EducationalModule } from '../../data/modules.ts'

interface ModuleSidebarProps {
  currentModule: EducationalModule
}

// Coluna lateral a partir de 1024 px; abaixo disso, faixa compacta com rolagem horizontal interna.
export function ModuleSidebar({ currentModule }: ModuleSidebarProps) {
  return (
    <nav aria-label="Módulos" className="min-w-0">
      <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
        {educationalModules.map((educationalModule) => {
          const isCurrent = educationalModule.id === currentModule.id

          return (
            <li key={educationalModule.id} className="shrink-0 lg:shrink">
              <Link
                to={getModulePath(educationalModule)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`relative flex items-center gap-3 rounded-xl border px-3 py-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:px-4 lg:py-3 ${
                  isCurrent
                    ? 'border-ink bg-ink text-white shadow-md'
                    : 'border-line bg-white text-ink shadow-sm hover:border-brand'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isCurrent ? 'bg-brand-light text-ink' : 'bg-brand-soft text-brand'
                  }`}
                >
                  {educationalModule.id}
                </span>
                <span className="flex flex-col">
                  <span className={`text-sm font-semibold ${isCurrent ? 'text-white' : 'text-slate-600'}`}>
                    Módulo {educationalModule.id}
                    <span className="sr-only">: {educationalModule.title}</span>
                  </span>
                  <span aria-hidden="true" className="hidden font-medium lg:block">
                    {educationalModule.title}
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
