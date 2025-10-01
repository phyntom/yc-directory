import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		formats: ['image/webp', 'image/avif'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
			{
				protocol: 'https',
				hostname: '*.sanity.io',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
						{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
		],
	},
	experimental: {
		ppr: 'incremental',
	},
	devIndicators: {
		position: 'bottom-left',
	},
};

export default withSentryConfig(nextConfig, {
	org: 'phyntomio',
	project: 'javascript-nextjs',
	silent: !process.env.CI,
	authToken: process.env.SENTRY_AUTH_TOKEN,
	widenClientFileUpload: true,
	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,
	automaticVercelMonitors: true,
	reactComponentAnnotation: {
		enabled: true,
	},
});
