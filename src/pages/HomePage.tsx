import { ArrowRight, Clock, Users } from 'lucide-react'
import { Link } from 'react-router'
import { ModuleCard } from '../components/modules/ModuleCard.tsx'
import { educationalModules, getModulePath } from '../data/modules.ts'

// Objetivos educacionais conforme AGENTS.md, seção 2.
const learningObjectives: readonly string[] = [
  'Apresentar conceitos de biomimética.',
  'Demonstrar a construção física utilizando garrafa PET.',
  'Explicar os circuitos eletrônicos do robô.',
  'Apresentar o funcionamento do transistor C1815.',
  'Ensinar os princípios do sensor ultrassônico HC-SR04.',
  'Explicar a programação C++ do robô.',
  'Demonstrar a máquina de estados Espreita e Ataque.',
  'Avaliar o aprendizado por meio de desafios e quiz.',
]

const firstModule = educationalModules[0]

export function HomePage() {
  return (
    <>
      <title>Bagre Robô Maker</title>

      <section
        aria-labelledby="titulo-apresentacao"
        className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Visão geral</p>
        <h1 id="titulo-apresentacao" className="mt-1 text-3xl font-bold text-ink sm:text-4xl">
          Bagre Robô Maker
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Plataforma educacional de apoio a uma aula guiada sobre a construção, a eletrônica e a
          programação de um robô inspirado em um peixe: o bagre.
        </p>

        <ul className="mt-5 flex flex-col gap-2 text-slate-700 sm:flex-row sm:gap-6">
          <li className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-5 shrink-0 text-brand" />
            Aula guiada de 90 minutos
          </li>
          <li className="flex items-center gap-2">
            <Users aria-hidden="true" className="size-5 shrink-0 text-brand" />
            Para alunos, professores e participantes externos
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to={getModulePath(firstModule)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Começar pelo Módulo 1
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
          <Link
            to="/modulos"
            className="inline-flex items-center justify-center rounded-lg border border-line bg-white px-5 py-3 font-semibold text-ink transition hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Ver todos os módulos
          </Link>
        </div>
      </section>

      <section aria-labelledby="titulo-objetivos" className="mt-8">
        <h2 id="titulo-objetivos" className="text-2xl font-bold text-ink">
          Objetivos da aula
        </h2>
        <ul className="mt-4 grid gap-3 rounded-2xl border border-line bg-white p-6 shadow-sm sm:grid-cols-2">
          {learningObjectives.map((learningObjective) => (
            <li key={learningObjective} className="flex gap-3 text-slate-700">
              <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-brand" />
              {learningObjective}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-modulos" className="mt-8">
        <h2 id="titulo-modulos" className="text-2xl font-bold text-ink">
          Módulos
        </h2>
        <p className="mt-2 text-slate-700">A aula está organizada em cinco módulos, nesta sequência.</p>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {educationalModules.map((educationalModule) => (
            <li key={educationalModule.id}>
              <ModuleCard educationalModule={educationalModule} />
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
