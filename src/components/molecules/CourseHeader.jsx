import Button from '@/components/atoms/Button'
import IconWrapper from '@/components/atoms/IconWrapper'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'

const CourseHeader = ({
  overallProgress,
  onToggleSidebar,
  onShowComingSoon
}) => {
  return (
    <div className="px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onToggleSidebar}
          className="lg:hidden p-1 hover:bg-surface-100 rounded"
          icon="Menu"
        />
        <div className="flex items-center space-x-3">
          <IconWrapper
            name="GraduationCap"
            size="medium"
            className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
            color="white"
          />
          <Heading level={1} className="text-xl font-bold text-surface-900">ApperAcademy</Heading>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Text variant="caption">
          {overallProgress}% Complete
        </Text>
        <Button
          onClick={() => onShowComingSoon('Search')}
          variant="ghost"
          icon="Search"
          className="text-surface-600"
        />
        <Button
          onClick={() => onShowComingSoon('Settings')}
          variant="ghost"
          icon="Settings"
          className="text-surface-600"
        />
      </div>
    </div>
  )
}

export default CourseHeader