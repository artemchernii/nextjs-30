import { Post, getAllPosts, getPostById } from "@/services/posts";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const elStyle = {
	border: "3px solid #ccc",
	borderRadius: "10px",
	padding: "10px 20px",
	maxWidth: "100vmin",
};

interface PostType {
	post: Post;
}
export default function PostPage({ post }: PostType) {
	const { query, back } = useRouter();

	const goBack = () => {
		back();
	};

	return (
		<div>
			<Head>
				<title>{post.title}</title>
			</Head>
			<p>Id: {query["id"]}</p>
			<div style={elStyle}>
				<div className="post-title">{post.title}</div>
				<div className="post-body">{post.body}</div>
				<div className="post-id">{post.id}</div>
				<Image
					src={`https://source.unsplash.com/random/200x200?sig=${query.id}`}
					alt={`Alt for ${query.id} - ${post.title}`}
					width={200}
					height={200}
					quality={100}
				/>
			</div>
			<button onClick={goBack}>Go back</button>
		</div>
	);
}

export async function getStaticProps(context: any) {
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
