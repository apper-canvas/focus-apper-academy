const TabButton = ({ label, isActive, onClick, showBadge, badgeText }) => {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-surface-500 hover:text-surface-700'
      }`}
    >
      {label}
      {showBadge && (
        <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
          {badgeText}
        </span>
      )}
    </button>
  )
}

export default TabButton