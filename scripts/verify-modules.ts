// Verificação das funções de sequência dos módulos, sem dependências externas.
// Uso: npm run verify:modules (requer Node.js >= 22.18, que executa TypeScript removendo os tipos).
import assert from 'node:assert/strict'
import {
  educationalModules,
  getAdjacentModules,
  getModulePosition,
  TOTAL_MODULES,
} from '../src/data/modules.ts'

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

console.log('verify:modules — todas as verificações passaram.')
