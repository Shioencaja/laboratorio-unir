/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};
