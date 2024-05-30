/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: "/api/:slug*",
      destination: "http://192.168.31.254:12000/:slug*",
    },
  ];
};


const nextConfig = {
  reactStrictMode: true,
  rewrites,
}

export default nextConfig;
