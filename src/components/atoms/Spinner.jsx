const Spinner = () => (
  <div className="flex h-screen bg-surface-50">
    <div className="w-80 bg-white border-r border-surface-200 p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-surface-200 rounded"></div>
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-12 bg-surface-100 rounded"></div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex-1 p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-surface-200 rounded w-1/3"></div>
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-4 bg-surface-100 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default Spinner