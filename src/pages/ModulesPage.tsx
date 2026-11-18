import { ModuleCard } from '../components/modules/ModuleCard.tsx'
import { educationalModules } from '../data/modules.ts'

export function ModulesPage() {
  return (
    <>
      <title>Módulos — Bagre Robô Maker</title>

      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Módulos</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-700">
        Os cinco módulos da aula, apresentados na sequência didática.
      </p>

      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {educationalModules.map((educationalModule) => (
          <li key={educationalModule.id}>
            <ModuleCard educationalModule={educationalModule} />
          </li>
        ))}
      </ol>
    </>
  )
}
