import { IconBrandGithub, IconBrandLinkedin, IconBrandStackoverflow, IconBrandX } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import { Fa6BrandsKaggle } from './fa6-brands-kaggle'
import { IconWrapper } from './icon-wrapper'

const socialNavItems = [
  { label: 'Twitter', href: 'https://twitter.com/marprezd', icon: <IconBrandX size={18} /> },
  { label: 'Kaggle', href: 'https://www.kaggle.com/maprezd', icon: <Fa6BrandsKaggle /> },
  { label: 'Stackoverflow', href: 'https://stackoverflow.com.users/11650008/marprezd', icon: <IconBrandStackoverflow size={18} /> },
  { label: 'Github', href: 'https://www.github.com/marprezd', icon: <IconBrandGithub size={18} /> },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/maprezd', icon: <IconBrandLinkedin size={18} /> },
]

export default function SocialShare() {
  return (
    <>
      {socialNavItems.map(link => (
        <Link key={link.label} aria-label={link.label} className="mx-1" href={link.href} target="_blank">
          <IconWrapper className="size-8 rounded-xl bg-neutral-200 p-2 text-neutral-700 transition-colors duration-300 hover:bg-primary-100 hover:text-primary-600 dark:bg-neutral-800 dark:text-neutral-300 hover:dark:bg-primary-700 hover:dark:text-primary-200">
            {link.icon}
          </IconWrapper>
        </Link>
      ))}
    </>
  )
}
