import Head from "next/head"
import Link from "next/link"
import Loader from "../components/Loader"

export default function Home() {
	return (
		<div>
			<Loader show />
			<Link
				href={{
					pathname: "/[username]",
					query: { username: "user123" },
				}}
			>
				<a>User's profile</a>
			</Link>
			Hello
		</div>
	)
}
