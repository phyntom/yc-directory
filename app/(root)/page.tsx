import { auth } from '@/auth';
import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import { Post } from '@/types';

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
	const query = (await searchParams).query;
	const posts: Array<Post> = [
		{
			createdAt: '2023-10-01T12:00:00Z',
			views: 55,
			likes: 40,
			author: {
				_id: '1',
				name: 'Steven Brown',
			},
			_id: '1',
			description:
				'We Robots is revolutionizing the technology sector with cutting-edge robotics solutions for businesses and consumers. Our mission is to automate everyday tasks and empower industries with smart, adaptive machines.',
			image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60', // Robot image for We Robots
			category: 'Technology',
			title: 'We Robots',
		},
		{
			createdAt: '2023-12-02T12:00:00Z',
			views: 120,
			likes: 80,
			author: {
				_id: '2',
				name: 'Jane Smith',
			},
			_id: '2',
			description:
				'Healthify is dedicated to making healthcare accessible and personalized. Our platform connects patients with top healthcare professionals and provides AI-driven health insights for better living.',
			image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60', // Healthify
			category: 'Health',
			title: 'Healthify',
		},
		{
			createdAt: '2023-06-22T12:00:00Z',
			views: 75,
			likes: 50,
			author: {
				_id: '3',
				name: 'Alice Johnson',
			},
			_id: '3',
			description:
				'FinTech Innovations is transforming the finance industry with secure, user-friendly digital banking and investment solutions. We help individuals and businesses manage money smarter and faster.',
			image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=60', // FinTech Innovations
			category: 'Finance',
			title: 'EcoTrack',
		},
	];
	return (
		<>
			<section className='pink_container'>
				<h1 className='heading'>
					Pitch Your Startup <br /> Connecte with Entrepreneurs
				</h1>
				<p className='sub-heading !max-w-3xl'>Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions</p>
				<SearchForm query={query} />
			</section>
			<section className='section_container'>
				<p className='text-30-semibold'>
					{query ? `Search results for "${query}"` : 'Search for startups by name, category, or founder.'}
				</p>
				<ul className='mt-5 card_grid'>
					{posts.length > 0 ? (
						<>
							{posts.map((post: Post) => (
								<StartupCard key={post?._id} post={post} />
							))}
						</>
					) : (
						<p>No startups found !!!</p>
					)}
				</ul>
			</section>
		</>
	);
}
