import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import StartupForm from '@/components/StartupForm';
import { Session } from 'inspector/promises';

const page = async () => {
	const session = await auth();
	if (!session) redirect('/');

	return (
		<>
			<section className='pink_container !min-h-[230px]'>
				<h1 className='heading'>Submit Your Starup</h1>
			</section>
			<StartupForm />
		</>
	);
};

export default page;
