import { Link, useMatch } from 'react-router'
import { educationalModules, getModulePath } from '../../data/modules.ts'

// Trilha da aula: os cinco módulos como pinos numerados, ligados por jumpers na cor de cada módulo.
// A ordem visual (da esquerda para a direita) é a ordem de leitura da aula.
export function ModuleTrail() {
  const moduleMatch = useMatch('/modulos/:moduleSlug')
  const currentSlug = moduleMatch?.params.moduleSlug

  return (
    <nav aria-label="Módulos da aula, em ordem" className="min-w-0">
      <ol className="flex items-center">
        {educationalModules.map((educationalModule, index) => {
          const isCurrent = educationalModule.slug === currentSlug
          const isLast = index === educationalModules.length - 1
          const { fill, onFill, wire } = educationalModule.colors

          return (
            <li key={educationalModule.id} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
              <Link
                to={getModulePath(educationalModule)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`Módulo ${educationalModule.id}: ${educationalModule.title}`}
                title={educationalModule.title}
                className="flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] font-display text-lg font-extrabold text-ink transition-transform hover:scale-105 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-rail-minus motion-reduce:transition-none"
                style={
                  isCurrent
                    ? { backgroundColor: fill, borderColor: fill, color: onFill, boxShadow: `0 0 0 3px #ffffff, 0 0 0 6px ${wire}` }
                    : { backgroundColor: '#ffffff', borderColor: wire }
                }
              >
                {educationalModule.id}
              </Link>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="mx-1.5 h-1 min-w-3 flex-1 rounded-full"
                  style={{ backgroundColor: wire }}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
