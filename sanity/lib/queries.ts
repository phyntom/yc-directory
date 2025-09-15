import { defineQuery } from 'next-sanity';

export const STARTUP_QUERY =
	defineQuery(`*[_type == "startup" && defined(slug.current) && ( !defined($search) || title match $search || category match $search || author->name match $search ) ] | order(_createdAt desc){
  _id,
  slug,
  description,
  category,
  image,
  pitch,
  author-> {
    _id,name,image,bio
  },
  title,
  _createdAt,
  views,
  }`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0]
{
  _id,
  slug,
  description,
  category,
  image,
  pitch,
  author-> {
    _id,name,image,bio,username
  },
  title,
  _createdAt,
  views,
  pitch
}`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
        _id, views
    }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
	`*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    image,
    bio,
  }`
);
