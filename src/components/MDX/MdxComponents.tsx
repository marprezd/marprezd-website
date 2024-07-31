// import dynamic from 'next/dynamic'
import * as runtime from 'react/jsx-runtime'
import DangerCallout from './DangerCallout'
import InfoCallout from './InfoCallout'
import MarkdownCodeTitles from './MdxCodeTitles'
import MarkdownImage from './MdxImage'
import MarkdownLink from './MdxLink'
import MarkdownPreCode from './MdxPreCode'
import MarkdownTable from './MdxTable'
import SuccessCallout from './SuccessCallout'
import WarningCallout from './WarningCallout'

/* const Mermaid = dynamic(() => import('./Mermaid'), {
  ssr: false,
}) */

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
  // Mermaid,
}

interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
