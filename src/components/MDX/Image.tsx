import type { ISizeCalculationResult } from 'image-size/dist/types/interface'
import type { ImageProps } from 'next/image'
import type { IncomingMessage } from 'node:http'
import { readFile } from 'node:fs/promises'
import https from 'node:https'
import path from 'node:path'
import sizeOf from 'image-size'
import NextImage from 'next/image'
import 'server-only'

// https://github.com/image-size/image-size/issues/258
// https://github.com/nickadamson/messonry/commit/1604311247f077718650435b4ca38ae87b41e55d
async function getStreamImageSize(stream: IncomingMessage) {
  const chunks = []

  for await (const chunk of stream) {
    chunks.push(chunk)
    try {
      // stop requesting data after dimensions are known
      return sizeOf(Buffer.concat(chunks))
    }
    catch (error) {
      // Not enough buffer to determine sizes yet
    }
  }
}

async function fetchImageSizeFromUrl(imageUrl: string) {
  // Not sure if this is the best way to do it, but it works so ...
  try {
    const imageSize = await new Promise<ISizeCalculationResult>(
      (resolve, reject) =>
        https
          .get(imageUrl, async (stream) => {
            const size = await getStreamImageSize(stream)

            if (size) {
              resolve(size)
            }
            else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({
                reason: `Error while resolving external image size with src: ${imageUrl}`,
              })
            }
          })
          .on('error', (e) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ reason: e })
          }),
    )

    return imageSize
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

async function fetchImageSizeFromFile(imagePath: string) {
  try {
    const img = await readFile(imagePath)

    return sizeOf(img)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Error while reading image with path: ${imagePath}`)
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

async function Image({
  src,
  quality = 100,
  ...restProps
}: Omit<ImageProps, 'src'> & { src: string }) {
  if (!src)
    return null
  const isExternalImage = src.startsWith('https')
  const isPublicImage = src.startsWith('/')
  const imgProps = { src, quality, ...restProps }
  let Img: typeof NextImage | string = 'img'

  let size: ISizeCalculationResult | undefined

  if (isPublicImage)
    size = await fetchImageSizeFromFile(path.join('public', src))

  if (isExternalImage)
    size = await fetchImageSizeFromUrl(src)

  if (size) {
    const { width, height } = size

    imgProps.width = width
    imgProps.height = height
    Img = NextImage
  }

  return <Img {...imgProps} />
}

export default Image
