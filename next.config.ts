/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cfafdwbhkrjzzmpqmmmo.supabase.co'], // allow this domain
  },
};

module.exports = nextConfig;
