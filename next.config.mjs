/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: "/api/:slug*",
      destination: process.env.BASE_URL + "/:slug*",
    },
  ];
};


const nextConfig = {
  reactStrictMode: true,
  rewrites,
}

export default nextConfig;
