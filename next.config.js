/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // Fix the workspace root inference issue
    output: 'export',
    experimental: {
        // next 16 specific options could go here
    }
};

module.exports = nextConfig;


