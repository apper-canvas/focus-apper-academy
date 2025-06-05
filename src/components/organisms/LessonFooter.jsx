import LessonNavigation from '@/components/molecules/LessonNavigation'

const LessonFooter = ({
  isCompleted,
  onMarkComplete,
  previousLesson,
  nextLesson,
  goToPreviousLesson,
  goToNextLesson
}) => {
  return (
    <div className="border-t border-surface-200 p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <LessonNavigation
          isCompleted={isCompleted}
          onMarkComplete={onMarkComplete}
          previousLesson={previousLesson}
          nextLesson={nextLesson}
          goToPreviousLesson={goToPreviousLesson}
          goToNextLesson={goToNextLesson}
        />
      </div>
    </div>
  )
}

export default LessonFooter