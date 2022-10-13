/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.finda.co.kr'],
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
};
