/** @type {import('next').NextConfig} */
// @ts-ignore

const withTranspileModules = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  amp: {
    canonicalBase: '/',
  },
  assetPrefix: '/',
  // experimental: {
  //   outputFileTracingRoot: '/',
  // },
  i18n: {
    locales: ['en'], // Replace 'en' with the desired locale(s)
    defaultLocale: 'en', // Replace 'en' with the default locale
  },
};

module.exports = withPlugins([
  nextConfig,
  withTranspileModules(['@cloudscape-design/components']),
]);
