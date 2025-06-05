import { delay } from '../index'
import codeSnippetsData from '../mockData/codeSnippets.json'

let codeSnippets = [...codeSnippetsData]

export const getAll = async () => {
  await delay(200)
  return [...codeSnippets]
}

export const getById = async (id) => {
  await delay(150)
  const snippet = codeSnippets.find(s => s.id === id)
  return snippet ? { ...snippet } : null
}

export const getByLessonId = async (lessonId) => {
  await delay(200)
  const snippets = codeSnippets.filter(s => s.lessonId === lessonId)
  return snippets.map(s => ({ ...s }))
}

export const create = async (snippetData) => {
  await delay(300)
  const newSnippet = {
    ...snippetData,
    id: Date.now().toString()
  }
  codeSnippets.push(newSnippet)
  return { ...newSnippet }
}

export const update = async (id, snippetData) => {
  await delay(250)
  const index = codeSnippets.findIndex(s => s.id === id)
  if (index !== -1) {
    codeSnippets[index] = { ...codeSnippets[index], ...snippetData }
    return { ...codeSnippets[index] }
  }
  throw new Error('Code snippet not found')
}

export const delete_ = async (id) => {
  await delay(200)
  const index = codeSnippets.findIndex(s => s.id === id)
  if (index !== -1) {
    const deleted = codeSnippets.splice(index, 1)[0]
    return { ...deleted }
  }
  throw new Error('Code snippet not found')
}