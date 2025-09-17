'use server';
import { client } from '@/sanity/lib/client';
import { StartupFormData } from './validation';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write.client';
import { auth } from '@/auth';
import { parseResponse } from './utils';

export async function createStartup(startup: StartupFormData) {
	// const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
	// 	id,
	// });
	const session = await auth();
	if (!session) {
		return parseResponse({ error: 'User not authenticated', status: 'ERROR' });
	}
	const { title, description, category, link, pitch } = startup;
	const slug = slugify(title, { lower: true, strict: true });
	const result = await writeClient.create({
		_type: 'startup',
		title,
		slug,
		description,
		category,
		link,
		pitch,
	});
}
function slugify(title: string, p0: { lower: boolean; strict: boolean }) {
	throw new Error('Function not implemented.');
}
