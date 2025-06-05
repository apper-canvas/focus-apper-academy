import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LessonHeader from '@/components/organisms/LessonHeader'
import LessonDetails from '@/components/organisms/LessonDetails'
import LessonFooter from '@/components/organisms/LessonFooter'
import WelcomeMessage from '@/components/organisms/WelcomeMessage'

const CourseContent = ({
  currentLesson,
  onMarkComplete,
  isCompleted,
  nextLesson,
  previousLesson,
  onSelectLesson,
  onShowComingSoon
}) => {
  const [activeTab, setActiveTab] = useState('content')

  const handleMarkComplete = () => {
    if (currentLesson && !isCompleted) {
      onMarkComplete(currentLesson.id)
    }
  }

  const goToNextLesson = () => {
    if (nextLesson) {
      onSelectLesson(nextLesson)
    }
  }

  const goToPreviousLesson = () => {
    if (previousLesson) {
      onSelectLesson(previousLesson)
    }
  }

  if (!currentLesson) {
    return <WelcomeMessage />
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <LessonHeader
        currentLesson={currentLesson}
        isCompleted={isCompleted}
        onShowComingSoon={onShowComingSoon}
      />

      <div className="border-b border-surface-200 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'content'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-surface-500 hover:text-surface-700'
              }`}
            >
              Lesson Content
            </button>
            <button
              onClick={() => onShowComingSoon('Practice')}
              className="py-3 px-1 border-b-2 border-transparent text-surface-500 hover:text-surface-700 font-medium text-sm"
            >
              Practice
              <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                Soon
              </span>
            </button>
            <button
              onClick={() => onShowComingSoon('Quiz')}
              className="py-3 px-1 border-b-2 border-transparent text-surface-500 hover:text-surface-700 font-medium text-sm"
            >
              Quiz
              <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                Soon
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LessonDetails currentLesson={currentLesson} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <LessonFooter
        isCompleted={isCompleted}
        onMarkComplete={handleMarkComplete}
        previousLesson={previousLesson}
        nextLesson={nextLesson}
        goToPreviousLesson={goToPreviousLesson}
        goToNextLesson={goToNextLesson}
      />
    </div>
  )
}

export default CourseContent