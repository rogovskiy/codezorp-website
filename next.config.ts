import type { NextConfig } from "next";

const nrExternals = require('newrelic/load-externals')

const nextConfig: NextConfig = {
  serverExternalPackages: ['newrelic'],
  /* config options here */
  webpack: (config) => {
    nrExternals(config)
    return config
  }
};

export default nextConfig;
