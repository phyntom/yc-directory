import { formatDate } from '@/lib/utils';
import type { Post } from '@/types';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

interface StartupCardProps {
	post: Post;
}
const StartupCard = ({ post }: StartupCardProps) => {
	const {
		createdAt,
		_id,
		views,
		author: { _id: authorId, name },
		category,
		title,
		description,
		image,
	} = post;
	return (
		<li className='startup-card group'>
			<div className='flex-between'>
				<p className='startup_card_date'>{formatDate(createdAt)}</p>
				<div className='flex gap-1.5'>
					<EyeIcon className='size-6 text-primary' />
					<span className='text-16-medium'>{views}</span>
				</div>
			</div>
			<div className='flex-between mt-5 gap-5'>
				<div className='flex-1'>
					<Link href={`/user/${authorId}`}>
						<p className='text-16-medium line-clamp-1'>{name}</p>
					</Link>
					<Link href={`/startup/${_id}`}>
						<h3 className='text-26-semibold line-clamp-1'>{title}</h3>
					</Link>
				</div>
				<Link href={`/startup/${_id}`}>
					<Image src='https://placehold.co/48x48' alt={'placeholder'} width={48} height={48} className='rounded-full' />
				</Link>
			</div>
			<Link href={`/startup/${_id}`}>
				<p className='startup-card_desc'>{description}</p>
				<img src={image} alt={title} className='startup-card_img' />
			</Link>
			<div className='flex-between mt-5 gap-5'>
				<Link href={`/?query=${category.toLowerCase()}`}>
					<p className='text-16-medium line-clamp-1'>{category}</p>
				</Link>
				<Button className='startup-card_btn'>
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export default StartupCard;
