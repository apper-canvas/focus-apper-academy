import IconWrapper from '@/components/atoms/IconWrapper'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'

const LessonHeader = ({ currentLesson, isCompleted, onShowComingSoon }) => {
  return (
    <div className="border-b border-surface-200 p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                isCompleted ? 'bg-secondary' : 'bg-surface-300'
              }`} />
              <Text variant="lesson-meta">
                Lesson • {currentLesson.duration} min read
              </Text>
            </div>
            <Heading level={1} className="mb-2">{currentLesson.title}</Heading>
            <Text variant="description">
              {currentLesson.description}
            </Text>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <Button
              onClick={() => onShowComingSoon('Bookmarks')}
              variant="ghost"
              icon="Bookmark"
              className="text-surface-600"
              title="Bookmark lesson"
            />
            <Button
              onClick={() => onShowComingSoon('Notes')}
              variant="ghost"
              icon="FileText"
              className="text-surface-600"
              title="Add notes"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonHeader