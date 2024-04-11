/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     use: ["@svgr/webpack"],
  //   })
  //   return config
  // },
}

export default nextConfig
