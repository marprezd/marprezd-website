import { easeOut } from 'motion-v'

export const motionItemTransition = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.4 },
  transition: {
    duration: 0.3,
    delay: 0.1,
    scale: { type: 'spring', stiffness: 100 },
    opacity: { duration: 0.3 },
    ease: easeOut,
  },
}
