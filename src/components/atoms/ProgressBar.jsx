import { motion } from 'framer-motion'

const ProgressBar = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-200">
      <div className="h-1 bg-surface-100">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default ProgressBar