import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({
  children,
  onClick,
  className = '',
  icon,
  variant = 'default',
  whileHover,
  whileTap,
  ...props
}) => {
  const baseClasses = "flex items-center justify-center rounded-lg transition-all duration-200"
  let variantClasses = ''

  switch (variant) {
    case 'primary':
      variantClasses = 'btn-primary'
      break
    case 'secondary':
      variantClasses = 'btn-secondary'
      break
    case 'ghost':
      variantClasses = 'p-2 hover:bg-surface-100'
      break
    case 'lesson-nav':
      variantClasses = 'w-full text-left p-3 rounded-lg transition-all duration-200 group'
      break
    case 'coming-soon':
      variantClasses = 'w-full text-left p-3 rounded-lg border-2 border-dashed border-surface-200 hover:border-surface-300 transition-colors group'
      break
    case 'copy':
      variantClasses = 'absolute top-3 right-3 px-3 py-1 rounded text-sm font-medium transition-all duration-200'
      break
    default:
      variantClasses = 'p-2'
  }

  const Component = motion.button

  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {icon && <ApperIcon name={icon} className="h-4 w-4" />}
      {children && <span className={icon ? 'ml-2' : ''}>{children}</span>}
    </Component>
  )
}

export default Button