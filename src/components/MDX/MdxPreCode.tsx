import MarkdownCopyCodeButton from './MdxCopyCodeBtn'

function MarkdownPreCode({
  children,
  ...restProps
}: React.ComponentPropsWithoutRef<'pre'>) {
  if (!('data-language' in restProps))
    return <pre {...restProps}>{children}</pre>

  return (
    <pre {...restProps} className="relative">
      <MarkdownCopyCodeButton className="copy-btn" />
      {children}
    </pre>
  )
}

export default MarkdownPreCode
