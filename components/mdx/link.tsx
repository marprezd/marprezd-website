/* eslint-disable react/display-name */
import { IconArrowUpRight } from '@tabler/icons-react'
import NextLink from 'next/link'
import { forwardRef } from 'react'

type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  showIcon?: boolean
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>((
  { children, showIcon = false, href = '', ...restProps },
  forwardedRef,
) => {
  // TODO: use regex instead of `startWith`
  const isRouterLink = href.startsWith('/')
  const isExternalLink = href.startsWith('https') || href.startsWith('http')
  // const isAnchorLink = href.startsWith("#");
  const Link = isRouterLink ? NextLink : 'a'

  return (
    <Link
      ref={forwardedRef}
      href={href}
      {...(isExternalLink
        ? {
            rel: 'noopener noreferrer nofollow',
          }
        : {})}
      {...restProps}
    >
      {children}
      {isExternalLink && showIcon && (
        <span className="inline-flex">
          <IconArrowUpRight className='size-4' />
        </span>
      )}
    </Link>
  )
})

export default Link
