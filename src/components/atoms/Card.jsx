const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-card ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card