import { Post, getAllPosts } from "@/services/posts";
import { useEffect, useState } from "react";

const styles = {
	border: "1px solid #000",
	maxWidth: "300px",
	background: "#ccc",
	borderRadius: "10px",
	color: "#000",
	padding: "10px",
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
			<h1>Posts</h1>
			<input
				type="text"
				placeholder="Search"
				value={filterData}
				onChange={changeFilterData}
			/>
			<div>
				{posts
					.filter(({ title }) => title.includes(filterData))
					.map((post) => {
						return (
							<div key={post.id} style={styles}>
								<h3>{post.title}</h3>
								<p>{post.body}</p>
							</div>
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
