function MarkdownTable(props: React.ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="border-borders rounded-global my-[2em] overflow-x-auto border">
      <table {...props} />
    </div>
  )
}

export default MarkdownTable
