import { motion } from 'framer-motion'

const LessonProgressCircle = ({ progress }) => {
  const circumference = 2 * Math.PI * 14
  const offset = circumference - (circumference * progress) / 100

  return (
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
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-surface-600">
          {progress}%
        </span>
      </div>
    </div>
  )
}

export default LessonProgressCircle