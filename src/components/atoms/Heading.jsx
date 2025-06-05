const Heading = ({ level = 1, children, className = '', ...props }) => {
  const Tag = `h${level}`
  let defaultClasses = ''

  switch (level) {
    case 1:
      defaultClasses = 'text-2xl sm:text-3xl font-bold text-surface-900'
      break
    case 2:
      defaultClasses = 'text-xl font-semibold text-surface-900'
      break
    case 3:
      defaultClasses = 'font-medium text-surface-800'
      break
    case 4:
      defaultClasses = 'font-medium text-surface-600'
      break
    default:
      defaultClasses = 'font-semibold text-surface-900'
  }

  return (
    <Tag className={`${defaultClasses} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default Heading