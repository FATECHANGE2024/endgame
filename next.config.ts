/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cfafdwbhkrjzzmpqmmmo.supabase.co'], // allow this domain
  },
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
  webpack: (config: any) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
    };
    return config;
  },
};

module.exports = nextConfig;
