import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth'; // Importing auth functions
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import { CiCirclePlus } from 'react-icons/ci';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = async () => {
	const session = await auth();
	return (
		<div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
			<nav className='flex justify-between items-center'>
				<Link href='/' className='text-2xl font-bold text-gray-800'>
					<Image src='/logo.png' alt='Logo' width={144} height={30} className='inline-block ml-2' />
				</Link>
				<div className='flex justify-center items-center gap-5 text-gray-900'>
					{session && session?.user ? (
						<>
							<Link href='/startup/create'>
								<span className='max-sm:hidden'>Create</span>
								<span className='sm:hidden'>
									<CiCirclePlus className='text-black-100 size-6' />
								</span>
							</Link>
							<form
								action={async () => {
									'use server';
									await signOut({
										redirectTo: '/',
									});
								}}
							>
								<button type='submit' className='flex items-center justify-center'>
									<span className='max-sm:hidden'>Sign out</span>
									<span className='sm:hidden'>
										<IoMdLogIn className=' text-black-100 size-6' />
									</span>
								</button>
							</form>
							<Link href={`/user/${session.user.id}`}>
								<Avatar>
									<AvatarImage src={session?.user?.image as string} alt="user avatar"/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
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
