import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { educationalModules, getModulePath } from '../data/modules.ts'

export function HomePage() {
  return (
    <>
      <title>Bagre Robô Maker</title>

      <section aria-labelledby="titulo-inicio" className="mb-8">
        <h1 id="titulo-inicio" className="text-3xl font-bold sm:text-4xl">
          Bagre Robô Maker
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-700">
          Plataforma de apoio à aula guiada sobre a construção, a eletrônica e a programação de um
          robô inspirado em um bagre.
        </p>
      </section>

      <section aria-labelledby="titulo-modulos">
        <h2 id="titulo-modulos" className="mb-4 text-xl font-semibold">
          Módulos
        </h2>
        <ol className="grid gap-3">
          {educationalModules.map((educationalModule) => (
            <li key={educationalModule.id}>
              <Link
                to={getModulePath(educationalModule)}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 hover:border-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-800"
                >
                  {educationalModule.id}
                </span>
                <span className="flex-1 font-medium">
                  <span className="sr-only">Módulo {educationalModule.id}: </span>
                  {educationalModule.title}
                </span>
                <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-slate-500" />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
