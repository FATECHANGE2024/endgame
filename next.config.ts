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
};

module.exports = nextConfig;

