import { Post, getAllPosts, getPostById } from "@/services/posts";
import { useRouter } from "next/router";

interface PostType {
	post: Post;
}
export default function PostPage({ post }: PostType) {
	const { query } = useRouter();

	return (
		<div>
			<p>Id: {query["id"]}</p>
		</div>
	);
}

export async function getStaticProps(context: any) {
	console.log("context: ", context);
	const post = await getPostById(context.params.id);

	return {
		props: {
			post,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const posts = await getAllPosts();

	return {
		paths: posts.map(({ id }) => ({ params: { id: id.toString() } })),
		fallback: false,
	};
}
