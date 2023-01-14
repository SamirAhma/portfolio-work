/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/**",
      },
      {
        protocol: "https",
        hostname: "github-readme-streak-stats.herokuapp.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "github-readme-stats.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
});
