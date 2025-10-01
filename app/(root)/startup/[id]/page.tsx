import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import OptimizedImage from '@/components/OptimizedImage';

export const experimental_ppr = true;

interface StartupPageProps {
	params: Promise<{ id: string }>;
}

const md = markdownit();

export default async function StartupPage({ params }: StartupPageProps) {
	const id = (await params).id;
	const [post, { select: editorPosts }] = await Promise.all([
		await client.fetch(STARTUP_BY_ID_QUERY, { id }),
		await client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug:'editor-picks'}),
	]);

	if (!post) return notFound();

	const parsedContent = md.render(post?.pitch || '');

	return (
		<>
			<section className='pink_container !min-h-[230px]'>
				<p className='tag'>{formatDate(post?._createdAt)}</p>

				<h1 className='heading'>{post.title}</h1>
				<p className='sub-heading !max-w-5xl'>{post.description}</p>
			</section>

			<section className='section_container'>
				<OptimizedImage
					src={post.image}
					alt={`${post.title} thumbnail`}
					width={800}
					height={400}
					className='w-[80%] max-h-96 h-auto rounded-xl shadow-secondary shadow-100 object-cover mx-auto transition-all duration-700 hover:shadow-300'
					priority={true}
					sizes='(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 800px'
					quality={85}
				/>

				<div className='space-y-5 mt-10 w-[80%] mx-auto'>
					<div className='flex-between gap-5'>
						<Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
							<OptimizedImage
								src={post.author.image}
								alt={`${post.author.name} avatar`}
								width={64}
								height={64}
								className='rounded-full drop-shadow-lg'
								sizes='64px'
								quality={90}
							/>

							<div>
								<p className='text-20-medium'>{post.author.name}</p>
								<p className='text-16-medium !text-black-300'>@{post.author.username}</p>
							</div>
						</Link>

						<p className='category-tag'>{post.category}</p>
					</div>
					<h3 className='text-30-bold !text-secondary'>Description</h3>
					<article className='w-full max-w-4xl font-work-sans break-all'>{post.description}</article>
					<h3 className='text-30-bold !text-secondary'>Pitch Details</h3>
					{parsedContent ? (
						<article
							className='prose max-w-4xl font-work-sans break-before-page'
							dangerouslySetInnerHTML={{ __html: parsedContent }}
						/>
					) : (
						<p className='no-result'>No details provided</p>
					)}
				</div>

				<hr className='divider' />
				{editorPosts?.length > 0 && (
					<div className='max-w-4xl mx-auto'>
						<p className='text-30-semibold'>Editor Picks</p>

						<ul className='mt-7 card_grid-sm'>
							{editorPosts.map((post: StartupTypeCard, i: number) => (
								<StartupCard key={i} post={post} />
							))}
						</ul>
					</div>
				)}

				<Suspense fallback={<Skeleton className='view_skeleton' />}>
					<View id={id} />
				</Suspense>
			</section>
		</>
	);
}
