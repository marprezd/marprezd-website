import dynamic from 'next/dynamic'
import * as runtime from 'react/jsx-runtime'
import InfoCallout from './info-callout'
import MarkdownCodeTitles from './mdx-code-titles'
import MarkdownImage from './mdx-image'
import MarkdownLink from './mdx-link'
import MarkdownPreCode from './mdx-pre-code'
import MarkdownTable from './mdx-table'
import WarningCallout from './warning-callout'
import SuccessCallout from './success-callout'
import DangerCallout from './danger-callout'

const Mermaid = dynamic(() => import('@/components/mermaid'), {
  ssr: false,
})

const useMDXComponent = (code: string) => {
  const fn = new Function(code)

  return fn({ ...runtime }).default
}

const components = {
  img: MarkdownImage,
  a: MarkdownLink,
  div: MarkdownCodeTitles as any,
  pre: MarkdownPreCode,
  table: MarkdownTable,
  InfoCallout,
  WarningCallout,
  SuccessCallout,
  DangerCallout,
  Mermaid,
}

interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
