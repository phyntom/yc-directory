export interface Post {
	_createdAt: string;
	views: number;
	likes: number;
	author: {
		_id: string;
		name: string;
	};
	_id: string;
	description: string;
	image: string;
	category: string;
	title: string;
	pitch?: string;
}
