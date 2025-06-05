import { delay } from '../index'
import modulesData from '../mockData/modules.json'

let modules = [...modulesData]

export const getAll = async () => {
  await delay(300)
  return [...modules]
}

export const getById = async (id) => {
  await delay(200)
  const module = modules.find(m => m.id === id)
  return module ? { ...module } : null
}

export const create = async (moduleData) => {
  await delay(400)
  const newModule = {
    ...moduleData,
    id: Date.now().toString()
  }
  modules.push(newModule)
  return { ...newModule }
}

export const update = async (id, moduleData) => {
  await delay(350)
  const index = modules.findIndex(m => m.id === id)
  if (index !== -1) {
    modules[index] = { ...modules[index], ...moduleData }
    return { ...modules[index] }
  }
  throw new Error('Module not found')
}

export const delete_ = async (id) => {
  await delay(300)
  const index = modules.findIndex(m => m.id === id)
  if (index !== -1) {
    const deleted = modules.splice(index, 1)[0]
    return { ...deleted }
  }
  throw new Error('Module not found')
}