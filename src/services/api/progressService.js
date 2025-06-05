import { delay } from '../index'
import progressData from '../mockData/progress.json'

let progress = [...progressData]

export const getAll = async () => {
  await delay(200)
  return [...progress]
}

export const getById = async (id) => {
  await delay(150)
  const userProgress = progress.find(p => p.id === id)
  return userProgress ? { ...userProgress } : null
}

export const create = async (progressData) => {
  await delay(300)
  const newProgress = {
    ...progressData,
    id: Date.now().toString()
  }
  progress.push(newProgress)
  return { ...newProgress }
}

export const update = async (id, progressData) => {
  await delay(250)
  const index = progress.findIndex(p => p.id === id)
  if (index !== -1) {
    progress[index] = { ...progress[index], ...progressData }
    return { ...progress[index] }
  } else {
    // Create new progress entry if none exists
    const newProgress = {
      ...progressData,
      id: id || Date.now().toString()
    }
    progress.push(newProgress)
    return { ...newProgress }
  }
}

export const delete_ = async (id) => {
  await delay(200)
  const index = progress.findIndex(p => p.id === id)
  if (index !== -1) {
    const deleted = progress.splice(index, 1)[0]
    return { ...deleted }
  }
  throw new Error('Progress not found')
}