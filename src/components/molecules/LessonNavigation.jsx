import Button from '@/components/atoms/Button'
import IconWrapper from '@/components/atoms/IconWrapper'
import { motion } from 'framer-motion'

const LessonNavigation = ({
  isCompleted,
  onMarkComplete,
  previousLesson,
  nextLesson,
  goToPreviousLesson,
  goToNextLesson
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        {previousLesson ? (
          <Button
            onClick={goToPreviousLesson}
            variant="secondary"
            icon="ChevronLeft"
            className="flex items-center space-x-2"
          >
            <span className="hidden sm:inline">Previous: {previousLesson.title}</span>
            <span className="sm:hidden">Previous</span>
          </Button>
        ) : (
          <div />
        )}
      </div>

      <div className="flex items-center space-x-4">
        {!isCompleted ? (
          <motion.button
            onClick={onMarkComplete}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconWrapper name="Check" size="small" />
            <span>Mark Complete</span>
          </motion.button>
        ) : (
          <div className="flex items-center space-x-2 text-secondary">
            <IconWrapper name="CheckCircle" size="medium" />
            <span className="font-medium">Completed!</span>
          </div>
        )}

        {nextLesson && (
          <Button
            onClick={goToNextLesson}
            variant="primary"
            icon="ChevronRight"
            className="flex items-center space-x-2"
          >
            <span className="hidden sm:inline">Next: {nextLesson.title}</span>
            <span className="sm:hidden">Next</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default LessonNavigation