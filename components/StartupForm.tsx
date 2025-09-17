'use client';
import React, { useState, useActionState, use } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { FaHourglassEnd } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { startupSchema } from '@/lib/validation';
import type { StartupFormData, StartupFormErrors } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';
import { writeClient } from '@/sanity/lib/write.client';
import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';

const StartupForm = () => {
	const [errors, setErrors] = useState<StartupFormErrors>({});
	const [pitch, setPitch] = useState<string>('');
	const { toast } = useToast();
	const router = useRouter();
	const session = await auth();

	const [state, formAction, isPending] = useActionState(handleFormSubmit, {
		error: '',
		status: 'INITIAL',
	});

	async function handleFormSubmit(prevState: any, formData: FormData) {
		try {
			const formValues: StartupFormData = {
				title: formData.get('title') as string,
				description: formData.get('description') as string,
				category: formData.get('category') as string,
				link: formData.get('link') as string,
				pitch: formData.get('pitch') as string,
			};
			const result = startupSchema.safeParse(formValues);
			// const result = await createStartup(prevState,formData,pitch)
			if (result.success) {
				toast({
					title: 'Success',
					description: 'Startup created successfully',
				});
				router.push(`/startup/id`);
				return { ...prevState, error: '', status: 'SUCCESS' };
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors = z.flattenError(error).fieldErrors;
				console.log(fieldErrors);
				setErrors(fieldErrors as StartupFormErrors);
				return { ...prevState, error: 'Validation failed', status: 'ERROR' };
			}
		}
		return { ...prevState, error: 'An expected error has occured', status: 'ERROR' };
	}

	return (
		<form action={formAction} className='startup-form'>
			<div>
				<label htmlFor='title' className='startup-form_label'>
					Title
				</label>
				<Input type='text' id='title' name='title' className='startup-form_input' placeholder='Startup Title' />
				{errors.title && <p className='startup-form_error'>{errors.title[0]}</p>}
			</div>
			<div>
				<label htmlFor='description' className='startup-form_label'>
					Description
				</label>
				<Textarea
					id='description'
					name='description'
					className='startup-form_textarea'
					placeholder='Startup Description'
				/>
				{errors.description && <p className='startup-form_error'>{errors.description[0]}</p>}
			</div>
			<div>
				<label htmlFor='category' className='startup-form_label'>
					Category
				</label>
				<Input
					type='text'
					id='category'
					name='category'
					className='startup-form_input'
					placeholder='Startup Category (Tech, Health, Education, ....)'
				/>
				{errors.category && <p className='startup-form_error'>{errors.category[0]}</p>}
			</div>
			<div>
				<label htmlFor='link' className='startup-form_label'>
					Image URL
				</label>
				<Input type='url' id='link' name='link' className='startup-form_input' placeholder='Startup Image URL' />
				{errors.link && <p className='startup-form_error'>{errors.link[0]}</p>}
			</div>
			<div data-color-mode='light' className='mb-4'>
				<label htmlFor='pitch' className='startup-form_label'>
					Pitch
				</label>
				<MDEditor
					value={pitch}
					onChange={(value) => setPitch(value as string)}
					id='pitch'
					preview='edit'
					height={300}
					style={{ borderRadius: 20, overflow: 'hidden' }}
					textareaProps={{
						placeholder: 'Describe what problem your startup solves ...',
					}}
					previewOptions={{
						rehypePlugins: [[rehypeSanitize]],
						disallowedElements: ['style'],
					}}
				/>
				{errors.pitch && <p className='startup-form_error'>{errors.pitch[0]}</p>}
			</div>
			<Button type='submit' className='startup-form_btn' disabled={isPending}>
				{isPending ? 'Submitting...' : 'Submit Startup'}
				{isPending ? <FaHourglassEnd /> : <IoIosSend />}
			</Button>
		</form>
	);
};

export default StartupForm;
