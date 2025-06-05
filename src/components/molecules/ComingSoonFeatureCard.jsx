import Button from '@/components/atoms/Button'
import IconWrapper from '@/components/atoms/IconWrapper'
import Text from '@/components/atoms/Text'
import Heading from '@/components/atoms/Heading'

const ComingSoonFeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <Button variant="coming-soon" onClick={onClick}>
      <div className="flex items-center space-x-3">
        <IconWrapper name={icon} size="medium" color="surface-400" />
        <div>
          <Heading level={4} className="text-sm text-surface-600">
            {title}
          </Heading>
          <Text variant="small" className="text-surface-400">
            {description}
          </Text>
        </div>
      </div>
    </Button>
  )
}

export default ComingSoonFeatureCard