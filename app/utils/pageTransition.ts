// utils/pageTransition.ts
import { easeOut } from 'motion-v'

export const motionPageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: (isReady: boolean) => ({ opacity: isReady ? 1 : 0, y: isReady ? 0 : 20 }),
  transition: { duration: 0.2, ease: easeOut },
}

