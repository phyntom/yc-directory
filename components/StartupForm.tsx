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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createStartup } from '@/lib/actions';
import { formatDate } from '@/lib/utils';

const StartupForm = () => {
	const [errors, setErrors] = useState<StartupFormErrors>({});
	const [pitch, setPitch] = useState('');
	const router = useRouter();

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
				pitch,
			};
			await startupSchema.parseAsync(formValues);

			const result = await createStartup(formValues);
			if (result.status === 'SUCCESS') {
				toast.success(`${formValues.title} has been created`, {});
				router.push(`/startup/${result._id}`);
			} else if (result.status === 'ERROR') {
				toast.error('Error creating startup', {
					description: result.error,
				});
			}
			return result;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors = z.flattenError(error).fieldErrors;
				setErrors(fieldErrors as StartupFormErrors);
				toast.error('Error occurs', {
					description: 'An unexpected error has occurred',
				});
				return { ...prevState, error: 'Validation failed', status: 'ERROR' };
			}
		}
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
					onChange={(value) => {
						// Add this line
						setPitch(value as string);
					}}
					id='pitch'
					preview='edit'
					height={300}
					style={{ borderRadius: 20, overflow: 'hidden' }}
					textareaProps={{
						placeholder: 'Briefly describe your idea and what problem it solves',
					}}
					previewOptions={{
						disallowedElements: ['style'],
						rehypePlugins: [[rehypeSanitize]],
					}}
				/>
				{/* <MDEditor.Markdown source={pitch} rehypePlugins={[[rehypeSanitize]]} /> */}
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
