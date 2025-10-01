'use server';
import { StartupFormData } from './validation';
import { writeClient } from '@/sanity/lib/write.client';
import { auth } from '@/auth';
import { parseActionResponse } from './utils';
import slugify from 'slugify';

type ActionResponse = {
	error: string;
	status: 'SUCCESS' | 'ERROR';
	_id?: string;
	_createdAt?: string;
};

export const createStartup = async (startup: StartupFormData): Promise<ActionResponse> => {
	try {
		const session = await auth();
		console.log('Session', session);

		if (!session) {
			return parseActionResponse({ error: 'User not authenticated', status: 'ERROR' });
		}
		const slug = slugify(startup.title, { lower: true, strict: true });
		const result = await writeClient.create({
			_type: 'startup',
			slug: {
				_type: slug,
				current: slug,
			},
			author: {
				_type: 'reference',
				_ref: String(session.id),
			},
			title: startup.title,
			description: startup.description,
			category: startup.category,
			image: startup.link,
			pitch: startup.pitch,
		});

		return parseActionResponse({
			...result,
			error: '',
			status: 'SUCCESS',
		});
	} catch (error) {
		return parseActionResponse({
			error: JSON.stringify(error),
			status: 'ERROR',
		});
	}
};
