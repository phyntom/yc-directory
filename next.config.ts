import type { NextConfig } from 'next';
import build from 'next/dist/build';

const nextConfig: NextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				pathname: '/**',
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

export default nextConfig;
