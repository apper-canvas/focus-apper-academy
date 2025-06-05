import IconWrapper from '@/components/atoms/IconWrapper'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'

const WelcomeMessage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="text-center max-w-md">
        <IconWrapper
          name="BookOpen"
          size="large"
          className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4"
          color="white"
        />
        <Heading level={2} className="text-xl font-semibold text-surface-900 mb-2">
          Welcome to ApperAcademy!
        </Heading>
        <Text>
          Select a lesson from the sidebar to start your journey in building apps with AI.
        </Text>
      </div>
    </div>
  )
}

export default WelcomeMessage