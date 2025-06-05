import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import ProgressBar from '@/components/atoms/ProgressBar'
import CourseHeader from '@/components/molecules/CourseHeader'
import LessonSidebar from '@/components/organisms/LessonSidebar'
import CourseContent from '@/components/organisms/CourseContent'
import ComingSoonModal from '@/components/molecules/ComingSoonModal'
import Spinner from '@/components/atoms/Spinner'
import IconWrapper from '@/components/atoms/IconWrapper'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'

import * as moduleService from '@/services/api/moduleService'
import * as lessonService from '@/services/api/lessonService'
import * as progressService from '@/services/api/progressService'

const HomePage = () => {
  const [modules, setModules] = useState([])
  const [lessons, setLessons] = useState([])
  const [progress, setProgress] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [comingSoonFeature, setComingSoonFeature] = useState('')

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [modulesResult, lessonsResult, progressResult] = await Promise.all([
          moduleService.getAll(),
          lessonService.getAll(),
          progressService.getAll()
        ])
        setModules(modulesResult)
        setLessons(lessonsResult)

        const userProgress = progressResult?.[0] || { completedLessons: [], currentLesson: null }
        setProgress(userProgress)

        const currentLessonId = userProgress.currentLesson || lessonsResult?.[0]?.id
        if (currentLessonId) {
          const lesson = lessonsResult.find(l => l.id === currentLessonId)
          setCurrentLesson(lesson)
        }
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load course data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const markLessonComplete = useCallback(async (lessonId) => {
    try {
      if (!progress?.completedLessons?.includes(lessonId)) {
        const updatedProgress = {
          ...progress,
          completedLessons: [...(progress?.completedLessons || []), lessonId],
          lastAccessed: Date.now()
        }

        await progressService.update(progress?.id || '1', updatedProgress)
        setProgress(updatedProgress)
        toast.success("Lesson completed! 🎉")
      }
    } catch (err) {
      toast.error("Failed to save progress")
    }
  }, [progress])

  const selectLesson = useCallback(async (lesson) => {
    try {
      setCurrentLesson(lesson)
      const updatedProgress = {
        ...progress,
        currentLesson: lesson.id,
        lastAccessed: Date.now()
      }
      await progressService.update(progress?.id || '1', updatedProgress)
      setProgress(updatedProgress)
    } catch (err) {
      console.error("Failed to update current lesson:", err)
    }
  }, [progress])

  const getNextLesson = useCallback(() => {
    if (!currentLesson || !lessons?.length) return null
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id)
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  }, [currentLesson, lessons])

  const getPreviousLesson = useCallback(() => {
    if (!currentLesson || !lessons?.length) return null
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id)
    return currentIndex > 0 ? lessons[currentIndex - 1] : null
  }, [currentLesson, lessons])

  const calculateOverallProgress = useCallback(() => {
    if (!lessons?.length || !progress?.completedLessons) return 0
    return Math.round((progress.completedLessons.length / lessons.length) * 100)
  }, [lessons, progress])

  const calculateModuleProgress = useCallback((moduleId) => {
    const module = modules?.find(m => m.id === moduleId)
    if (!module?.lessons?.length || !progress?.completedLessons) return 0

    const moduleLessons = lessons?.filter(l => module.lessons.includes(l.id)) || []
    const completedInModule = moduleLessons.filter(l => progress.completedLessons.includes(l.id)).length
    return Math.round((completedInModule / moduleLessons.length) * 100)
  }, [modules, lessons, progress])

  const showComingSoonModal = useCallback((feature) => {
    setComingSoonFeature(feature)
    setShowComingSoon(true)
  }, [])

  const closeComingSoonModal = useCallback(() => {
    setShowComingSoon(false)
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface-50">
        <div className="text-center">
          <IconWrapper name="AlertTriangle" size="xl" color="red-500" className="mx-auto mb-4" />
          <Heading level={2} className="mb-2">Something went wrong</Heading>
          <Text variant="error">{error}</Text>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden">
      <ProgressBar progress={calculateOverallProgress()} />
      <CourseHeader
        overallProgress={calculateOverallProgress()}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onShowComingSoon={showComingSoonModal}
      />

      <LessonSidebar
        sidebarOpen={sidebarOpen}
        lessons={lessons}
        modules={modules}
        progress={progress}
        currentLesson={currentLesson}
        onSelectLesson={selectLesson}
        calculateModuleProgress={calculateModuleProgress}
        onShowComingSoon={showComingSoonModal}
      />

      <div className="flex-1 pt-16 overflow-hidden">
        <CourseContent
          currentLesson={currentLesson}
          onMarkComplete={markLessonComplete}
          isCompleted={progress?.completedLessons?.includes(currentLesson?.id)}
          nextLesson={getNextLesson()}
          previousLesson={getPreviousLesson()}
          onSelectLesson={selectLesson}
          onShowComingSoon={showComingSoonModal}
        />
      </div>

      <ComingSoonModal
        show={showComingSoon}
        featureName={comingSoonFeature}
        onClose={closeComingSoonModal}
      />

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 pt-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default HomePage