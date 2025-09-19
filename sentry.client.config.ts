import * as Sentry from '@sentry/nextjs';
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	sendDefaultPii: true,
	tracesSampleRate: 1.0,
	//  performance
	integrations: [
		//  session-replay
		// Replay may only be enabled for the client-side
		Sentry.replayIntegration({
			maskAllText: false,
			blockAllMedia: false,
		}),
		//  session-replay
		//  user-feedback
		// Sentry.feedbackIntegration({
		// 	// Additional SDK configuration goes in here, for example:
		// 	colorScheme: 'system',
		// }),
	],
	replaysSessionSampleRate: 0.3,
	replaysOnErrorSampleRate: 1.0,
	//  session-replay
	//  logs
	// Enable logs to be sent to Sentry
	enableLogs: true,
});
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
