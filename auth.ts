import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { AUTHOR_BY_USER_ID_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write.client';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [GitHub, Google],
	callbacks: {
		async signIn({ user, profile, account }) {
			let id, username, bio, name, email, image;
			if (account?.provider === 'github') {
				// GitHub profile fields
				id = String(profile?.id);
				username = profile?.login;
				bio = profile?.bio;
				name = user?.name;
				email = user?.email;
				image = user?.image;
			} else if (account?.provider === 'google') {
				// Google profile fields
				id = String(profile?.sub);
				username = user?.email?.substring(0, user?.email.indexOf('@')); // or profile.name as username alternative
				bio = '';
				name = profile?.given_name + ' ' + profile?.family_name;
				email = user.email;
				image = user.image;
			}
			const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_USER_ID_QUERY, {
				id,
			});

			if (!existingUser) {
				await writeClient.create({
					_type: 'author',
					id,
					name,
					username,
					email,
					image,
					bio: bio || '',
				});
			}
			return true;
		},
		async jwt({ token, account, profile }) {
			// First time jwt callback is run, user logs in
			if (account && profile) {
				const id = account.provider === 'github' ? profile.id : profile.sub;
				const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_USER_ID_QUERY, {
					id: String(id),
				});
				console.log('Existing User in JWT callback:', existingUser);
				token.id = existingUser?._id;
			}
			return token;
		},
		async session({ session, token }) {
			Object.assign(session, { id: token.id });
			return session;
		},
	},
});
