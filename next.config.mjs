/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects(){
      return [
        {
          source: '/playgotchi',
          destination: 'https://playgotchi.com',
          permanent: false
        },
        {
          source: '/pinatacloud',
          destination: 'https://pinata.cloud/blog',
          permanent: false
        }
      ]
    }
  };
  
  export default nextConfig;
