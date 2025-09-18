import { UserIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const author = defineType({
	name: 'author',
	title: 'Author',
	type: 'document',
	icon: UserIcon,
	fields: [
		defineField({
			name: 'id',
			type: 'string',
			title: 'Id',
			description: 'Unique identifier for the author',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'name',
			type: 'string',
			title: 'Name',
			description: 'name for the author',
		}),
		defineField({
			name: 'username',
			type: 'string',
			title: 'Username',
			description: 'unique username for the author',
		}),
		defineField({
			name: 'email',
			type: 'string',
			title: 'email',
			description: 'Email for the author',
		}),
		defineField({
			name: 'image',
			type: 'url',
			title: 'Avatar',
			description: 'Avatar image for the author',
		}),
		defineField({
			name: 'bio',
			type: 'text',
			title: 'Bio',
			description: 'Biography for the author',
		}),
	],
	preview: {
		select: {
			title: 'name',
		},
	},
});
