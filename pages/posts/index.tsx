import { Post, getAllPosts } from "@/services/posts";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const styles = {
	border: "1px solid #000",
	maxWidth: "300px",
	background: "#ccc",
	borderRadius: "10px",
	color: "#000",
	padding: "10px",
	margin: "10px 5px",
};
interface PostsType {
	posts: Post[];
}
export default function Main({ posts }: PostsType) {
	const [filterData, setFilterData] = useState<string>("");

	const changeFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterData(event.target.value);
	};

	// const [posts, setPosts] = useState<Post[]>([]);

	// useEffect(() => {
	// 	getAllPosts().then((data) => {
	// 		setPosts(data);
	// 	});
	// }, []);

	return (
		<>
			<Head>
				<title>All posts</title>
			</Head>
			<h1>Posts</h1>
			<input
				type="text"
				placeholder="Search"
				value={filterData}
				onChange={changeFilterData}
			/>
			<div className="wrapper-flex">
				{posts
					.filter(({ title }) => title.includes(filterData))
					.map((post) => {
						return (
							<Link key={post.id} href={`/posts/${post.id}`}>
								<div style={styles}>
									<h3>{post.title}</h3>
									<p>{post.body}</p>
								</div>
							</Link>
						);
					})}
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const posts = await getAllPosts();

	return {
		props: {
			posts,
		},
	};
}
