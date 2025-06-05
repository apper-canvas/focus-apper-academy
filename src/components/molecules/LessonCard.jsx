import Button from '@/components/atoms/Button'
import IconWrapper from '@/components/atoms/IconWrapper'
import Text from '@/components/atoms/Text'
import { motion } from 'framer-motion'

const LessonCard = ({ lesson, isCompleted, isCurrent, onSelectLesson }) => {
  return (
    <motion.button
      onClick={() => onSelectLesson(lesson)}
      className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
        isCurrent
          ? 'bg-primary text-white shadow-md'
          : 'hover:bg-surface-50 text-surface-700'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isCompleted
              ? 'bg-secondary border-secondary'
              : isCurrent
                ? 'border-white'
                : 'border-surface-300'
          }`}>
            {isCompleted && (
              <IconWrapper name="Check" size="small" color="white" />
            )}
          </div>
          <div>
            <Text variant="small" className="font-medium">
              {lesson.title}
            </Text>
            <Text variant="lesson-status" className={`${isCurrent ? 'text-blue-100' : 'text-surface-500'}`}>
              {lesson.duration} min
            </Text>
          </div>
        </div>
        {isCurrent && (
          <IconWrapper name="Play" size="small" />
        )}
      </div>
    </motion.button>
  )
}

export default LessonCard