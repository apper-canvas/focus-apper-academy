const Text = ({ children, className = '', variant = 'body', ...props }) => {
  let defaultClasses = ''

  switch (variant) {
    case 'body':
      defaultClasses = 'text-surface-600'
      break
    case 'caption':
      defaultClasses = 'text-sm text-surface-600'
      break
    case 'small':
      defaultClasses = 'text-xs'
      break
    case 'lesson-meta':
      defaultClasses = 'text-sm text-surface-500'
      break
    case 'lesson-status':
      defaultClasses = 'text-xs text-blue-100'
      break
    case 'description':
      defaultClasses = 'text-surface-600 text-lg'
      break
    case 'error':
      defaultClasses = 'text-surface-600'
      break
    case 'info':
      defaultClasses = 'text-surface-600 mb-6'
      break
    case 'tip-item':
      defaultClasses = 'flex items-start space-x-2 text-amber-800'
      break
    default:
      defaultClasses = 'text-surface-600'
  }

  return (
    <p className={`${defaultClasses} ${className}`} {...props}>
      {children}
    </p>
  )
}

export default Text