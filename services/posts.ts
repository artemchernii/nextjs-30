import { API_URL } from ".";

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export async function getAllPosts(): Promise<Post[]> {
	const response = await fetch(API_URL);
	return await response.json();
}
export async function getPostById(id: number): Promise<Post> {
	const response = await fetch(`${API_URL}${id}`);
	return await response.json();
}
