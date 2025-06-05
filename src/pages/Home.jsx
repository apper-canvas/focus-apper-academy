import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import * as moduleService from '../services/api/moduleService'
import * as lessonService from '../services/api/lessonService'
import * as progressService from '../services/api/progressService'

const Home = () => {
  const [modules, setModules] = useState([])
  const [lessons, setLessons] = useState([])
  const [progress, setProgress] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [comingSoonFeature, setComingSoonFeature] = useState('')

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [modulesResult, lessonsResult, progressResult] = await Promise.all([
          moduleService.getAll(),
          lessonService.getAll(),
          progressService.getAll()
        ])
        setModules(modulesResult)
        setLessons(lessonsResult)
        
        const userProgress = progressResult?.[0] || { completedLessons: [], currentLesson: null }
        setProgress(userProgress)
        
        // Set current lesson or first lesson
        const currentLessonId = userProgress.currentLesson || lessonsResult?.[0]?.id
        if (currentLessonId) {
          const lesson = lessonsResult.find(l => l.id === currentLessonId)
          setCurrentLesson(lesson)
        }
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load course data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const markLessonComplete = async (lessonId) => {
    try {
      if (!progress?.completedLessons?.includes(lessonId)) {
        const updatedProgress = {
          ...progress,
          completedLessons: [...(progress?.completedLessons || []), lessonId],
          lastAccessed: Date.now()
        }
        
        await progressService.update(progress?.id || '1', updatedProgress)
        setProgress(updatedProgress)
        toast.success("Lesson completed! 🎉")
      }
    } catch (err) {
      toast.error("Failed to save progress")
    }
  }

  const selectLesson = async (lesson) => {
    try {
      setCurrentLesson(lesson)
      const updatedProgress = {
        ...progress,
        currentLesson: lesson.id,
        lastAccessed: Date.now()
      }
      await progressService.update(progress?.id || '1', updatedProgress)
      setProgress(updatedProgress)
    } catch (err) {
      console.error("Failed to update current lesson:", err)
    }
  }

  const getNextLesson = () => {
    if (!currentLesson || !lessons?.length) return null
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id)
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  }

  const getPreviousLesson = () => {
    if (!currentLesson || !lessons?.length) return null
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id)
    return currentIndex > 0 ? lessons[currentIndex - 1] : null
  }

  const calculateOverallProgress = () => {
    if (!lessons?.length || !progress?.completedLessons) return 0
    return Math.round((progress.completedLessons.length / lessons.length) * 100)
  }

  const calculateModuleProgress = (moduleId) => {
    const module = modules?.find(m => m.id === moduleId)
    if (!module?.lessons?.length || !progress?.completedLessons) return 0
    
    const moduleLessons = lessons?.filter(l => module.lessons.includes(l.id)) || []
    const completedInModule = moduleLessons.filter(l => progress.completedLessons.includes(l.id)).length
    return Math.round((completedInModule / moduleLessons.length) * 100)
  }

  const showComingSoonModal = (feature) => {
    setComingSoonFeature(feature)
    setShowComingSoon(true)
  }

  if (loading) {
    return (
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
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface-50">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-surface-900 mb-2">Something went wrong</h2>
          <p className="text-surface-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-200">
        <div className="h-1 bg-surface-100">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${calculateOverallProgress()}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1 hover:bg-surface-100 rounded"
            >
              <ApperIcon name="Menu" className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-surface-900">ApperAcademy</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-surface-600">
              {calculateOverallProgress()}% Complete
            </span>
            <button 
              onClick={() => showComingSoonModal('Search')}
              className="p-2 hover:bg-surface-100 rounded-lg"
            >
              <ApperIcon name="Search" className="h-5 w-5 text-surface-600" />
            </button>
            <button 
              onClick={() => showComingSoonModal('Settings')}
              className="p-2 hover:bg-surface-100 rounded-lg"
            >
              <ApperIcon name="Settings" className="h-5 w-5 text-surface-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed lg:relative z-40 w-80 h-full bg-white border-r border-surface-200 pt-20 lg:pt-16"
          >
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-surface-100">
                <h2 className="font-semibold text-surface-900 mb-2">Course Progress</h2>
                <div className="text-sm text-surface-600">
                  {progress?.completedLessons?.length || 0} of {lessons?.length || 0} lessons completed
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto sidebar-scroll p-6 space-y-6">
                {modules?.map((module) => {
                  const moduleProgress = calculateModuleProgress(module.id)
                  const moduleLessons = lessons?.filter(l => module.lessons?.includes(l.id)) || []
                  
                  return (
                    <div key={module.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-surface-800">{module.title}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 relative">
                            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                              <circle
                                cx="16"
                                cy="16"
                                r="14"
                                stroke="#e2e8f0"
                                strokeWidth="3"
                                fill="transparent"
                              />
                              <motion.circle
                                cx="16"
                                cy="16"
                                r="14"
                                stroke="#10B981"
                                strokeWidth="3"
                                fill="transparent"
                                strokeDasharray={87.96}
                                initial={{ strokeDashoffset: 87.96 }}
                                animate={{ strokeDashoffset: 87.96 - (87.96 * moduleProgress) / 100 }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-medium text-surface-600">
                                {moduleProgress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {moduleLessons.map((lesson) => {
                          const isCompleted = progress?.completedLessons?.includes(lesson.id)
                          const isCurrent = currentLesson?.id === lesson.id
                          
                          return (
                            <motion.button
                              key={lesson.id}
                              onClick={() => selectLesson(lesson)}
                              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                                isCurrent 
                                  ? 'bg-primary text-white shadow-md' 
                                  : 'hover:bg-surface-50 text-surface-700'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    isCompleted 
                                      ? 'bg-secondary border-secondary' 
                                      : isCurrent 
                                        ? 'border-white' 
                                        : 'border-surface-300'
                                  }`}>
                                    {isCompleted && (
                                      <ApperIcon name="Check" className="h-3 w-3 text-white" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm">{lesson.title}</div>
                                    <div className={`text-xs ${
                                      isCurrent ? 'text-blue-100' : 'text-surface-500'
                                    }`}>
                                      {lesson.duration} min
                                    </div>
                                  </div>
                                </div>
                                {isCurrent && (
                                  <ApperIcon name="Play" className="h-4 w-4" />
                                )}
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
                
                {/* Coming Soon Features */}
                <div className="pt-6 border-t border-surface-100 space-y-3">
                  <h3 className="font-medium text-surface-600">Coming Soon</h3>
                  <button 
                    onClick={() => showComingSoonModal('Community')}
                    className="w-full text-left p-3 rounded-lg border-2 border-dashed border-surface-200 hover:border-surface-300 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Users" className="h-5 w-5 text-surface-400" />
                      <div>
                        <div className="font-medium text-sm text-surface-600">Community</div>
                        <div className="text-xs text-surface-400">Join discussions</div>
                      </div>
                    </div>
                  </button>
                  <button 
                    onClick={() => showComingSoonModal('Resources')}
                    className="w-full text-left p-3 rounded-lg border-2 border-dashed border-surface-200 hover:border-surface-300 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Download" className="h-5 w-5 text-surface-400" />
                      <div>
                        <div className="font-medium text-sm text-surface-600">Resources</div>
                        <div className="text-xs text-surface-400">Downloadable guides</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 pt-16 overflow-hidden">
        <MainFeature 
          currentLesson={currentLesson}
          onMarkComplete={markLessonComplete}
          isCompleted={progress?.completedLessons?.includes(currentLesson?.id)}
          nextLesson={getNextLesson()}
          previousLesson={getPreviousLesson()}
          onSelectLesson={selectLesson}
          onShowComingSoon={showComingSoonModal}
        />
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Zap" className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-2">
                  {comingSoonFeature} Coming Soon!
                </h3>
                <p className="text-surface-600 mb-6">
                  We're working hard to bring you this feature. Stay tuned for updates!
                </p>
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="btn-primary w-full"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 pt-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Home