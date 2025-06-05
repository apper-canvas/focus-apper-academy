import Heading from '@/components/atoms/Heading'
import LessonProgressCircle from '@/components/atoms/LessonProgressCircle'

const ModuleProgress = ({ title, progress }) => {
  return (
    <div className="flex items-center justify-between">
      <Heading level={3}>{title}</Heading>
      <div className="flex items-center space-x-2">
        <LessonProgressCircle progress={progress} />
      </div>
    </div>
  )
}

export default ModuleProgress