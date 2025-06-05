import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Heading from '@/components/atoms/Heading'
import IconWrapper from '@/components/atoms/IconWrapper'
import Text from '@/components/atoms/Text'
import Card from '@/components/atoms/Card'

const ComingSoonModal = ({ show, featureName, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <IconWrapper
                name="Zap"
                size="large"
                className="w-16 h-16 bg-gradient-to-br from-accent to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4"
                color="white"
              />
              <Heading level={2} className="text-xl font-bold text-surface-900 mb-2">
                {featureName} Coming Soon!
              </Heading>
              <Text variant="info">
                We're working hard to bring you this feature. Stay tuned for updates!
              </Text>
              <Button onClick={onClose} className="w-full" variant="primary">
                Got it!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ComingSoonModal