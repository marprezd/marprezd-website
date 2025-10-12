"use client"

import type { CldImageProps } from "next-cloudinary"
import { CldImage as CldImageDefault } from "next-cloudinary"

function CloudImage(props: CldImageProps) {
  return <CldImageDefault {...props} />
}

export default CloudImage
