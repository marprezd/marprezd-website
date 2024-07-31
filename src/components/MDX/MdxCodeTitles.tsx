import BrandIcon from './BrandIcon'

type MarkdownCodeTitlesProps = React.ComponentPropsWithoutRef<'div'> & {
  [key: `data-${string}`]: string
}

function MarkdownCodeTitles({
  children,
  ...restProps
}: MarkdownCodeTitlesProps) {
  if (!('data-rehype-pretty-code-title' in restProps))
    return <div {...restProps}>{children}</div>

  const language = restProps['data-language']

  return (
    <div {...restProps} className="flex items-center gap-2">
      <BrandIcon
        brand={language}
        className="text-foreground-secondary"
        height="1em"
        width="1em"
      />
      <span>{children}</span>
    </div>
  )
}

export default MarkdownCodeTitles
