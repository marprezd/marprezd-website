import { IconInfoCircle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface CalloutProps {
  children: React.ReactNode
}

function InfoCallout({ children }: CalloutProps) {
  const t = useTranslations('site')

  return (
    <div
      className="not-prose rounded-lg border-t-2 border-blue-500 bg-blue-50 p-4 dark:bg-blue-800"
      role="alert"
    >
      <div className="flex">
        <div className="shrink-0">
          <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-200 text-blue-800 dark:border-blue-900 dark:bg-blue-800 dark:text-blue-400">
            <IconInfoCircle className="size-4 shrink-0" />
          </span>
        </div>
        <div className="ms-3">
          <h3 className="font-semibold text-blue-800 dark:text-white">
            {t('posts.callouts.info')}
          </h3>
          <div className="text-sm text-blue-700 dark:text-blue-400">
            {children}
          </div>
        </div>
      </div>
    </div>

  )
}

export default InfoCallout
