// utils/sectionTransition.ts
import { easeOut } from 'motion-v'

export const motionSectionTransition = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.3,
    delay: 0.1,
    scale: { type: 'spring', stiffness: 100, damping: 20 },
    opacity: { duration: 0.3 },
    ease: easeOut,
  },
}
