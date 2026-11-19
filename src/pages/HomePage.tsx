import { Link } from 'react-router'
import { LessonCircuit } from '../components/home/LessonCircuit.tsx'
import { educationalModules, getModulePath, TOTAL_MODULES } from '../data/modules.ts'

const firstModule = educationalModules[0]

// Página inicial: apresentação da aula e o circuito com os cinco módulos, na ordem de leitura.
export function HomePage() {
  const { fill, onFill } = firstModule.colors

  return (
    <>
      <title>Bagre Robô Maker</title>

      <section
        aria-labelledby="titulo-inicio"
        className="grid gap-6 pt-2 sm:pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8"
      >
        <div>
          <p className="text-lg font-semibold text-brand">Aula guiada de 90 minutos</p>
          <h1
            id="titulo-inicio"
            className="mt-2 font-display text-[clamp(3.2rem,9vw,6.5rem)] leading-[0.92] font-extrabold tracking-tight font-stretch-condensed"
          >
            Monte, ligue e programe um robô-bagre
          </h1>
          <p className="mt-4 max-w-[38rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
            Um robô inspirado no bagre, feito com garrafa PET. A aula segue cinco módulos, na ordem do circuito abaixo.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            <li className="rounded-full border border-hole bg-white px-3.5 py-1.5 text-[15px] font-semibold">
              {TOTAL_MODULES} módulos
            </li>
            <li className="rounded-full border border-hole bg-white px-3.5 py-1.5 text-[15px] font-semibold">
              Para alunos, professores e participantes externos
            </li>
          </ul>
        </div>

        <Link
          to={getModulePath(firstModule)}
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[14px] py-4 pr-6 pl-4 text-lg font-bold whitespace-nowrap shadow-[0_4px_0_rgba(0,0,0,0.28)] transition hover:brightness-110 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-rail-minus motion-reduce:transition-none"
          style={{ backgroundColor: fill, color: onFill }}
        >
          <span
            aria-hidden="true"
            className="flex size-[30px] items-center justify-center rounded-full bg-white font-display font-extrabold"
            style={{ color: fill }}
          >
            {firstModule.id}
          </span>
          Começar pelo Módulo {firstModule.id}
        </Link>
      </section>

      <LessonCircuit />
    </>
  )
}
