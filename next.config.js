const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://plus.unsplash.com",
        pathname: "/v0/b/**" // ou o caminho mais específico do seu bucket
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
