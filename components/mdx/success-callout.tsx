import { IconCircleDashedCheck } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface CalloutProps {
  children: React.ReactNode
}

function SuccessCallout({ children }: CalloutProps) {
  const t = useTranslations('site')

  return (
    <div
      className="not-prose rounded-lg border-t-2 border-teal-500 bg-teal-50 p-4 dark:bg-teal-800"
      role="alert"
    >
      <div className="flex">
        <div className="shrink-0">
          <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
            <IconCircleDashedCheck className="size-4 shrink-0" />
          </span>
        </div>
        <div className="ms-3">
          <h3 className="font-semibold text-teal-800 dark:text-white">
            {t('posts.callouts.success')}
            .
          </h3>
          <div className="text-sm text-teal-700 dark:text-teal-400">
            {children}
          </div>
        </div>
      </div>
    </div>

  )
}

export default SuccessCallout
