import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import IconWrapper from '@/components/atoms/IconWrapper'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
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
        <Text variant="caption" className="mb-2">{description}</Text>
      )}
      <div className="bg-surface-900 rounded-lg p-4 relative overflow-x-auto">
        <Button
          onClick={copyToClipboard}
          className={`${copied ? 'bg-secondary text-white' : 'bg-surface-700 text-surface-300 hover:bg-surface-600'}`}
          variant="copy"
        >
          <IconWrapper
            name={copied ? "Check" : "Copy"}
            size="small"
          />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
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

const LessonDetails = ({ currentLesson }) => {
  return (
    <>
      <LessonContent lesson={currentLesson} />

      {currentLesson.id === '1' && (
        <div className="mt-8 space-y-6">
          <Heading level={3} className="text-xl font-semibold text-surface-800 mb-4">
            Try This Example Prompt:
          </Heading>
          <CodeSnippet
            code="Create a simple to-do list app with the ability to add, remove, and mark tasks as complete. Use a clean, modern design with a blue color scheme."
            description="Copy this prompt and paste it into Apper to create your first app!"
          />
        </div>
      )}

      {currentLesson.id === '2' && (
        <div className="mt-8 space-y-6">
          <Heading level={3} className="text-xl font-semibold text-surface-800 mb-4">
            Sample App Prompts:
          </Heading>
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

      {currentLesson.tips && currentLesson.tips.length > 0 && (
        <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <IconWrapper
              name="Lightbulb"
              size="medium"
              className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
              color="white"
            />
            <div className="flex-1">
              <Heading level={3} className="text-lg font-semibold text-amber-900 mb-3">
                Next Steps & Tips
              </Heading>
              <ul className="space-y-2">
                {currentLesson.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2 text-amber-800"
                  >
                    <IconWrapper name="CheckCircle" size="small" color="secondary" className="flex-shrink-0 mt-0.5" />
                    <Text variant="tip-item">{tip}</Text>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LessonDetails