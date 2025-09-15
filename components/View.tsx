import React from 'react';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { unstable_after as after } from 'next/server';
import { writeClient } from '@/sanity/lib/write.client';

interface ViewProps {
	id: string;
}

const View = async ({ id }: ViewProps) => {
	const { views: startupViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
	after(
		async () =>
			await writeClient
				.patch(id)
				.set({ views: (startupViews || 0) + 1 })
				.commit()
	);
	return (
		<div className='view-container'>
			<div className='absolute -top-2 -right-2'>
				<Ping />
			</div>
			<p className='view-text'>
				<span className='font-black'>
					{startupViews} {startupViews > 1 ? 'views' : 'view'}
				</span>
			</p>
		</div>
	);
};

export default View;
