import { motion, AnimatePresence } from 'framer-motion'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import ModuleProgress from '@/components/molecules/ModuleProgress'
import LessonCard from '@/components/molecules/LessonCard'
import ComingSoonFeatureCard from '@/components/molecules/ComingSoonFeatureCard'

const LessonSidebar = ({
  sidebarOpen,
  lessons,
  modules,
  progress,
  currentLesson,
  onSelectLesson,
  calculateModuleProgress,
  onShowComingSoon
}) => {
  return (
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
              <Heading level={2} className="text-surface-900 mb-2">Course Progress</Heading>
              <Text variant="caption">
                {progress?.completedLessons?.length || 0} of {lessons?.length || 0} lessons completed
              </Text>
            </div>

            <div className="flex-1 overflow-y-auto sidebar-scroll p-6 space-y-6">
              {modules?.map((module) => {
                const moduleProgress = calculateModuleProgress(module.id)
                const moduleLessons = lessons?.filter(l => module.lessons?.includes(l.id)) || []

                return (
                  <div key={module.id} className="space-y-3">
                    <ModuleProgress title={module.title} progress={moduleProgress} />

                    <div className="space-y-1">
                      {moduleLessons.map((lesson) => {
                        const isCompleted = progress?.completedLessons?.includes(lesson.id)
                        const isCurrent = currentLesson?.id === lesson.id

                        return (
                          <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            isCompleted={isCompleted}
                            isCurrent={isCurrent}
                            onSelectLesson={onSelectLesson}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              <div className="pt-6 border-t border-surface-100 space-y-3">
                <Heading level={4}>Coming Soon</Heading>
                <ComingSoonFeatureCard
                  icon="Users"
                  title="Community"
                  description="Join discussions"
                  onClick={() => onShowComingSoon('Community')}
                />
                <ComingSoonFeatureCard
                  icon="Download"
                  title="Resources"
                  description="Downloadable guides"
                  onClick={() => onShowComingSoon('Resources')}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LessonSidebar