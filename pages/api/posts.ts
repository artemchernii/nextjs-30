import { NextApiResponse, NextApiRequest } from "next";

type Post = {
	title: string;
	body: string;
};
export default function PostsApi(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json([
		{
			title: "Hello",
			body: "world",
		},
	]);
}
