import { Link } from 'react-router'
import { getAdjacentModules, getModulePath, type EducationalModule } from '../../data/modules.ts'

interface ModuleEndCardProps {
  educationalModule: EducationalModule
}

// Fecha o módulo e aponta o próximo, na cor dele; no último módulo, encerra a aula.
export function ModuleEndCard({ educationalModule }: ModuleEndCardProps) {
  const { previousModule, nextModule } = getAdjacentModules(educationalModule)

  return (
    <section
      aria-labelledby="fim-do-modulo"
      className="mt-16 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-ink p-7 text-white sm:p-8"
    >
      <div>
        <h2 id="fim-do-modulo" className="font-display text-2xl font-bold">
          {nextModule ? `Fim do Módulo ${educationalModule.id}` : 'Fim da aula'}
        </h2>
        <p className="mt-1.5 text-slate-300">
          {nextModule ? `O próximo é ${nextModule.title}.` : 'Você passou pelos cinco módulos.'}
        </p>
        {previousModule && (
          <Link
            to={getModulePath(previousModule)}
            className="mt-3 inline-flex min-h-11 items-center rounded-lg text-slate-200 underline underline-offset-4 hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
          >
            Voltar ao Módulo {previousModule.id}
          </Link>
        )}
      </div>

      {nextModule ? (
        <Link
          to={getModulePath(nextModule)}
          className="inline-flex min-h-13 items-center gap-3 rounded-xl px-6 text-lg font-bold focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white"
          style={{ backgroundColor: nextModule.colors.fill, color: nextModule.colors.onFill }}
        >
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full font-display text-[15px] font-extrabold"
            style={{ backgroundColor: nextModule.colors.onFill, color: nextModule.colors.fill }}
          >
            {nextModule.id}
          </span>
          Começar o Módulo {nextModule.id}
        </Link>
      ) : (
        <Link
          to="/"
          className="inline-flex min-h-13 items-center rounded-xl bg-white px-6 text-lg font-bold text-ink focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-light"
        >
          Voltar à visão geral
        </Link>
      )}
    </section>
  )
}
