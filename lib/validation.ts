import { z } from 'zod';

export const startupSchema = z.object({
	title: z.string().min(5, { error: 'Title must be at least 5 characters long' }),
	description: z
		.string()
		.min(20, { error: 'Description must be at least 20 characters long' })
		.max(500, { error: 'Description must be at most 500 characters long' }),
	category: z.string().min(5, { error: 'Category must be at least 5 characters long' }),
	link: z
		.string()
		.url()
		.refine(async (url) => {
			try {
				const response = await fetch(url, { method: 'HEAD' });
				const contentType = response.headers.get('content-type');
				return contentType?.startsWith('image/');
			} catch (error) {
				return false;
			}
		}),
	pitch: z.string().min(200, { error: 'Pitch must be at least 200 characters long' }),
});

export type StartupFormData = z.infer<typeof startupSchema>;

export type StartupFormErrors = Partial<Record<keyof z.infer<typeof startupSchema>, string[]>>;
