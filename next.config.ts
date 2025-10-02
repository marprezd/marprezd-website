import type { NextConfig } from "next"
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
// import next-intl plugin
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
    qualities: [80],
    formats: ["image/avif", "image/webp"],
  },
}

// apply next-intl plugin
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
initOpenNextCloudflareForDev({
  experimental: {
    remoteBindings: true,
  },
})
