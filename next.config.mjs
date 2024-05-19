/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: "/api/:slug*",
      destination: "http://localhost:12000/:slug*",
    },
  ];
};


const nextConfig = {
  reactStrictMode: true,
  rewrites,
}

export default nextConfig;
