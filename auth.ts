import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write.client';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [GitHub, Google],
	callbacks: {
		async signIn({ user, profile, account }) {
			let id, login, bio, name, email, image;
			if (account?.provider === 'github') {
				// GitHub profile fields
				id = profile?.id;
				login = profile?.login;
				bio = profile?.bio;
				name = user?.name;
				email = user?.email;
				image = user?.image;
			} else if (account?.provider === 'google') {
				// Google profile fields
				id = profile?.sub;
				login = profile?.email; // or profile.name as username alternative
				bio = '';
				name = user.name;
				email = user.email;
				image = user.image;
			}
			const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
				id,
			});

			if (!existingUser) {
				await writeClient.create({
					_type: 'author',
					id,
					name,
					username: login,
					email,
					image,
					bio: bio || '',
				});
			}

			return true;
		},
		async jwt({ token, account, profile }) {
			if (account && profile) {
				const id = account?.provider === 'github' ? profile?.id : profile?.sub;
				const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
					id,
				});
				token.id = user?._id;
			}

			return token;
		},
		async session({ session, token }) {
			Object.assign(session, { id: token.id });
			return session;
		},
	},
});
