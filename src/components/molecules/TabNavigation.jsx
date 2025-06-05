import TabButton from '@/components/atoms/TabButton'

const TabNavigation = ({ activeTab, setActiveTab, onShowComingSoon }) => {
  return (
    <div className="border-b border-surface-200 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex space-x-8">
          <TabButton
            label="Lesson Content"
            isActive={activeTab === 'content'}
            onClick={() => setActiveTab('content')}
          />
          <TabButton
            label="Practice"
            isActive={false}
            onClick={() => onShowComingSoon('Practice')}
            showBadge
            badgeText="Soon"
          />
          <TabButton
            label="Quiz"
            isActive={false}
            onClick={() => onShowComingSoon('Quiz')}
            showBadge
            badgeText="Soon"
          />
        </div>
      </div>
    </div>
  )
}

export default TabNavigation