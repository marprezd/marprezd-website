import { IconRadioactive } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface CalloutProps {
  children: React.ReactNode
}

function DangerCallout({ children }: CalloutProps) {
  const t = useTranslations('site')

  return (
    <div
      className="not-prose rounded-lg border-t-2 border-red-500 bg-red-50 p-4 dark:bg-red-800"
      role="alert"
    >
      <div className="flex">
        <div className="shrink-0">
          <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
            <IconRadioactive className="size-4 shrink-0" />
          </span>
        </div>
        <div className="ms-3">
          <h3 className="font-semibold text-red-800 dark:text-white">
            {t('posts.callouts.danger')}
          </h3>
          <div className="text-sm text-red-700 dark:text-red-400">
            {children}
          </div>
        </div>
      </div>
    </div>

  )
}

export default DangerCallout
