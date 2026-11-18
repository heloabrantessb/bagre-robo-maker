import { Link } from 'react-router'
import { educationalModules, getModulePath } from '../data/modules.ts'

export function HomePage() {
  return (
    <>
      <title>Bagre Robô Maker</title>
      <h1>Bagre Robô Maker</h1>
      <h2>Módulos</h2>
      <ol>
        {educationalModules.map((educationalModule) => (
          <li key={educationalModule.id}>
            <Link to={getModulePath(educationalModule)}>{educationalModule.title}</Link>
          </li>
        ))}
      </ol>
    </>
  )
}
