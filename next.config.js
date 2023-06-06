const { withExpo } = require("@expo/next-adapter");

/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "react-native",
    "expo",
    "react-native-svg",
    "twrnc",
    "react-native-web"
    // Add more React Native / Expo packages here...
  ],
  experimental: {
    forceSwcTransforms: false,
  },
});

module.exports = nextConfig;
