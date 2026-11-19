// Verificação das funções de sequência dos módulos (src/data/modules.ts).
// Uso: npm run verify:modules
//
// Funciona em toda a faixa de Node.js declarada no package.json (^20.19.0 || >=22.12.0):
// em vez de depender da execução nativa de TypeScript pelo Node (disponível só a partir do 22.18),
// o arquivo é convertido para JavaScript em memória com o pacote "typescript", que já é
// dependência de desenvolvimento do projeto. Nenhuma dependência adicional é necessária.
//
// Limitação: src/data/modules.ts não pode importar outros arquivos locais, pois o módulo
// convertido é carregado a partir de uma URL "data:".
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

const modulesSourceUrl = new URL('../src/data/modules.ts', import.meta.url)
const { outputText } = ts.transpileModule(readFileSync(modulesSourceUrl, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  fileName: 'modules.ts',
})
const { educationalModules, getAdjacentModules, getModulePosition, getStepElementId, TOTAL_MODULES } = await import(
  `data:text/javascript;charset=utf-8,${encodeURIComponent(outputText)}`
)

const firstModule = educationalModules[0]
const lastModule = educationalModules[TOTAL_MODULES - 1]

// Posição de cada módulo na sequência.
educationalModules.forEach((educationalModule, index) => {
  assert.equal(getModulePosition(educationalModule), index + 1)
})

// Objeto equivalente criado separadamente: localizado pelo id, não pela referência.
const equivalentModule = { ...educationalModules[1] }
assert.notEqual(equivalentModule, educationalModules[1])
assert.equal(getModulePosition(equivalentModule), 2)
assert.deepEqual(getAdjacentModules(equivalentModule), {
  previousModule: educationalModules[0],
  nextModule: educationalModules[2],
})

// Extremidades da sequência.
assert.deepEqual(getAdjacentModules(firstModule), {
  previousModule: undefined,
  nextModule: educationalModules[1],
})
assert.deepEqual(getAdjacentModules(lastModule), {
  previousModule: educationalModules[TOTAL_MODULES - 2],
  nextModule: undefined,
})

// Módulo desconhecido: sem posição e sem vizinhos.
const unknownModule = { id: 99, slug: 'modulo-inexistente', title: 'Módulo inexistente' }
assert.equal(getModulePosition(unknownModule), undefined)
assert.deepEqual(getAdjacentModules(unknownModule), {
  previousModule: undefined,
  nextModule: undefined,
})

// Cores e passos de cada módulo.
const hexColor = /^#[0-9a-f]{6}$/i
const stepId = /^[a-z0-9]+(-[a-z0-9]+)*$/
const elementIds = new Set()
educationalModules.forEach((educationalModule) => {
  const { fill, onFill, accent } = educationalModule.colors
  ;[fill, onFill, accent].forEach((color) => assert.match(color, hexColor))
  assert.ok(educationalModule.steps.length > 0, `Módulo ${educationalModule.id} sem passos`)
  const ids = educationalModule.steps.map((step) => step.id)
  assert.equal(new Set(ids).size, ids.length, `Passos repetidos no módulo ${educationalModule.id}`)
  educationalModule.steps.forEach((step) => {
    assert.match(step.id, stepId)
    assert.ok(step.title.trim().length > 0)
    elementIds.add(getStepElementId(educationalModule, step))
  })
})
// Os ids HTML dos passos são únicos em toda a plataforma.
const totalSteps = educationalModules.reduce((sum, educationalModule) => sum + educationalModule.steps.length, 0)
assert.equal(elementIds.size, totalSteps)
assert.equal(getStepElementId({ id: 1 }, { id: 'o-que-e-biomimetica' }), 'modulo-1-passo-o-que-e-biomimetica')

console.log('verify:modules — todas as verificações passaram.')
