import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const CodeSnippet = ({ code, language = 'text', description }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  return (
    <div className="relative group">
      {description && (
        <p className="text-sm text-surface-600 mb-2">{description}</p>
      )}
      <div className="bg-surface-900 rounded-lg p-4 relative overflow-x-auto">
        <button
          onClick={copyToClipboard}
          className={`absolute top-3 right-3 px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
            copied 
              ? 'bg-secondary text-white' 
              : 'bg-surface-700 text-surface-300 hover:bg-surface-600'
          }`}
        >
          <div className="flex items-center space-x-1">
            <ApperIcon 
              name={copied ? "Check" : "Copy"} 
              className="h-3 w-3" 
            />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </div>
        </button>
        <pre className="text-surface-100 text-sm font-mono overflow-x-auto pr-20">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

const LessonContent = ({ lesson }) => {
  if (!lesson) return null

  return (
    <div className="lesson-content max-w-none">
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </div>
  )
}

const MainFeature = ({ 
  currentLesson, 
  onMarkComplete, 
  isCompleted, 
  nextLesson, 
  previousLesson, 
  onSelectLesson,
  onShowComingSoon 
}) => {
  const [activeTab, setActiveTab] = useState('content')

  const handleMarkComplete = () => {
    if (currentLesson && !isCompleted) {
      onMarkComplete(currentLesson.id)
    }
  }

  const goToNextLesson = () => {
    if (nextLesson) {
      onSelectLesson(nextLesson)
    }
  }

  const goToPreviousLesson = () => {
    if (previousLesson) {
      onSelectLesson(previousLesson)
    }
  }

  if (!currentLesson) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="BookOpen" className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-surface-900 mb-2">
            Welcome to ApperAcademy!
          </h2>
          <p className="text-surface-600">
            Select a lesson from the sidebar to start your journey in building apps with AI.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Lesson Header */}
      <div className="border-b border-surface-200 p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  isCompleted ? 'bg-secondary' : 'bg-surface-300'
                }`} />
                <span className="text-sm text-surface-500">
                  Lesson • {currentLesson.duration} min read
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-2">
                {currentLesson.title}
              </h1>
              <p className="text-surface-600 text-lg">
                {currentLesson.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                onClick={() => onShowComingSoon('Bookmarks')}
                className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                title="Bookmark lesson"
              >
                <ApperIcon name="Bookmark" className="h-5 w-5 text-surface-600" />
              </button>
              <button
                onClick={() => onShowComingSoon('Notes')}
                className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                title="Add notes"
              >
                <ApperIcon name="FileText" className="h-5 w-5 text-surface-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-surface-200 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'content'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-surface-500 hover:text-surface-700'
              }`}
            >
              Lesson Content
            </button>
            <button
              onClick={() => onShowComingSoon('Practice')}
              className="py-3 px-1 border-b-2 border-transparent text-surface-500 hover:text-surface-700 font-medium text-sm"
            >
              Practice
              <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                Soon
              </span>
            </button>
            <button
              onClick={() => onShowComingSoon('Quiz')}
              className="py-3 px-1 border-b-2 border-transparent text-surface-500 hover:text-surface-700 font-medium text-sm"
            >
              Quiz
              <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                Soon
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LessonContent lesson={currentLesson} />
              
              {/* Code Examples */}
              {currentLesson.id === '1' && (
                <div className="mt-8 space-y-6">
                  <h3 className="text-xl font-semibold text-surface-800 mb-4">
                    Try This Example Prompt:
                  </h3>
                  <CodeSnippet
                    code="Create a simple to-do list app with the ability to add, remove, and mark tasks as complete. Use a clean, modern design with a blue color scheme."
                    description="Copy this prompt and paste it into Apper to create your first app!"
                  />
                </div>
              )}
              
              {currentLesson.id === '2' && (
                <div className="mt-8 space-y-6">
                  <h3 className="text-xl font-semibold text-surface-800 mb-4">
                    Sample App Prompts:
                  </h3>
                  <CodeSnippet
                    code="Build a recipe finder app where users can search for recipes by ingredients, save favorites, and view cooking instructions."
                    description="Recipe App Prompt"
                  />
                  <CodeSnippet
                    code="Create a personal expense tracker with categories, monthly budgets, and spending analytics charts."
                    description="Expense Tracker Prompt"
                  />
                </div>
              )}

              {/* Next Steps Section */}
              {currentLesson.tips && currentLesson.tips.length > 0 && (
                <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="Lightbulb" className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-amber-900 mb-3">
                        Next Steps & Tips
                      </h3>
                      <ul className="space-y-2">
                        {currentLesson.tips.map((tip, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-2 text-amber-800"
                          >
                            <ApperIcon name="CheckCircle" className="h-4 w-4 mt-0.5 text-secondary flex-shrink-0" />
                            <span>{tip}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lesson Navigation Footer */}
      <div className="border-t border-surface-200 p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {previousLesson ? (
                <button
                  onClick={goToPreviousLesson}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ApperIcon name="ChevronLeft" className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous: {previousLesson.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <div></div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {!isCompleted ? (
                <motion.button
                  onClick={handleMarkComplete}
                  className="btn-primary flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ApperIcon name="Check" className="h-4 w-4" />
                  <span>Mark Complete</span>
                </motion.button>
              ) : (
                <div className="flex items-center space-x-2 text-secondary">
                  <ApperIcon name="CheckCircle" className="h-5 w-5" />
                  <span className="font-medium">Completed!</span>
                </div>
              )}

              {nextLesson && (
                <button
                  onClick={goToNextLesson}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span className="hidden sm:inline">Next: {nextLesson.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ApperIcon name="ChevronRight" className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFeature