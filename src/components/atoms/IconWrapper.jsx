import ApperIcon from '@/components/ApperIcon'

const IconWrapper = ({ name, className = '', size = 'medium', color = 'default', ...props }) => {
  let sizeClasses = ''
  switch (size) {
    case 'small':
      sizeClasses = 'h-3 w-3'
      break
    case 'medium':
      sizeClasses = 'h-5 w-5'
      break
    case 'large':
      sizeClasses = 'h-8 w-8'
      break
    case 'xl':
      sizeClasses = 'h-12 w-12'
      break
    default:
      sizeClasses = 'h-5 w-5'
  }

  let colorClasses = ''
  switch (color) {
    case 'primary':
      colorClasses = 'text-primary'
      break
    case 'secondary':
      colorClasses = 'text-secondary'
      break
    case 'white':
      colorClasses = 'text-white'
      break
    case 'surface-400':
      colorClasses = 'text-surface-400'
      break
    case 'surface-600':
      colorClasses = 'text-surface-600'
      break
    case 'red-500':
      colorClasses = 'text-red-500'
      break
    case 'amber-800':
      colorClasses = 'text-amber-800'
      break
    default:
      colorClasses = ''
  }

  return (
    <ApperIcon name={name} className={`${sizeClasses} ${colorClasses} ${className}`} {...props} />
  )
}

export default IconWrapper