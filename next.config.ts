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
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
			},
		],
	},
	experimental: {
		ppr: 'incremental',
		after: true,
	},
	devIndicators: {
		appIsrStatus: true,
		buildActivity: true,
		buildActivityPosition: 'bottom-right',
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
