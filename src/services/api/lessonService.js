import { delay } from '../index'
import lessonsData from '../mockData/lessons.json'

let lessons = [...lessonsData]

export const getAll = async () => {
  await delay(250)
  return [...lessons]
}

export const getById = async (id) => {
  await delay(200)
  const lesson = lessons.find(l => l.id === id)
  return lesson ? { ...lesson } : null
}

export const create = async (lessonData) => {
  await delay(400)
  const newLesson = {
    ...lessonData,
    id: Date.now().toString(),
    completed: false
  }
  lessons.push(newLesson)
  return { ...newLesson }
}

export const update = async (id, lessonData) => {
  await delay(350)
  const index = lessons.findIndex(l => l.id === id)
  if (index !== -1) {
    lessons[index] = { ...lessons[index], ...lessonData }
    return { ...lessons[index] }
  }
  throw new Error('Lesson not found')
}

export const delete_ = async (id) => {
  await delay(300)
  const index = lessons.findIndex(l => l.id === id)
  if (index !== -1) {
    const deleted = lessons.splice(index, 1)[0]
    return { ...deleted }
  }
  throw new Error('Lesson not found')
}