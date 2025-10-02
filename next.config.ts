import type { NextConfig } from "next"
import process from "node:process"
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
// import next-intl plugin
import createNextIntlPlugin from "next-intl/plugin"

// add velite config
const isDev = process.argv.includes("dev")
const isBuild = process.argv.includes("build")
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1"
  import("velite").then(m => m.build({ watch: isDev, clean: !isDev }))
}

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
