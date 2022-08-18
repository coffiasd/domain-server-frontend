require("dotenv").config({ path: ".env" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ReAddress: process.env.CONTRACT_RECOVER_ADDRESS,
  }
}

module.exports = nextConfig
