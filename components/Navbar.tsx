import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth'; // Importing auth functions
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Navbar = async () => {
	const session = await auth();
	return (
		<div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
			<nav className='flex items-center justify-between'>
				<Link href='/' className='text-2xl font-bold text-gray-800'>
					<Image src='/logo.png' alt='Logo' width={144} height={30} className='inline-block ml-2' />
				</Link>
				<div className='flex items-center space-x-2 gap-1 text-gray-900'>
					{session && session?.user ? (
						<>
							<Link href='/startup/create'>
								<span>Create</span>
							</Link>
							<form
								action={async () => {
									'use server';
									await signOut({
										redirectTo: '/',
									});
								}}
							>
								<button type='submit'>Sign out</button>
							</form>
							<Link href={`/user/${session.user.id}`}>
								<Image
									src={session?.user?.image || '/default-avatar.png'}
									alt='Profile'
									width={32}
									height={32}
									className='rounded-full'
								/>
								{/* <span className='text-gray-600 hover:text-gray-800'>{session?.user?.name || session.user.email}</span> */}
							</Link>
						</>
					) : (
						<>
							<form
								action={async () => {
									'use server';
									await signIn('github');
								}}
							>
								<button type='submit' className='border px-3 py-2 rounded-md hover:bg-gray-200'>
									<FaGithub />
								</button>
							</form>
							<form
								action={async () => {
									'use server';
									await signIn('google');
								}}
							>
								<button type='submit' className='border px-3 py-2 rounded-md hover:bg-gray-200'>
									<FcGoogle />
								</button>
							</form>
						</>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
