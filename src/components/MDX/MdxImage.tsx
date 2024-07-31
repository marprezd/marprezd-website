import type { ImageProps } from 'next/image'
import Image from './Image'

async function MarkdownImage({
  src,
  alt = '',
  ...restProps
}: ImageProps & { src: string }) {
  return (
    <figure>
      <Image
        alt={alt}
        sizes="(min-width: 1024px) 80vw, 100vw"
        src={src}
        {...restProps}
      />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  )
}

export default MarkdownImage
