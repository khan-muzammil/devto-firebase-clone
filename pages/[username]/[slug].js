import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import PostContent from "../../components/PostContent"
import Metatags from "../../components/Metatags"
import AuthCheck from "../../components/AuthCheck"
import { useContext } from "react"
import { UserContext } from "../../lib/context"
import Link from "next/link"
import HeartButton from "../../components/HeartButton"

export default function PostPage(props) {
	const postRef = firestore.doc(props.path)
	const [realtimePost] = useDocumentData(postRef)

	const post = realtimePost || props.post
	const { user: currentUser } = useContext(UserContext)

	return (
		<main>
			<Metatags title={post.title} description={post.title} />
			<section>
				<PostContent post={post} />
			</section>
			<aside className="card">
				<p>
					<strong>{post.heartCount || 0} 🤍</strong>
				</p>
			</aside>

			<AuthCheck
				fallback={
					<Link href="/enter">
						<button>💗 Sign Up</button>
					</Link>
				}
			>
				<HeartButton postRef={postRef} />
			</AuthCheck>

			{currentUser?.uid === post.uid && (
				<Link href={`/admin/${post.slug}`}>
					<button className="btn-blue">Edit Post</button>
				</Link>
			)}
		</main>
	)
}

export async function getStaticProps({ params }) {
	const { username, slug } = params
	const userDoc = await getUserWithUsername(username)

	let post, path

	if (userDoc) {
		const postRef = userDoc.ref.collection("posts").doc(slug)
		post = postToJSON(await postRef.get())
		path = postRef.path
	}

	return {
		props: { post, path },
		revalidate: 100,
	}
}

export async function getStaticPaths() {
	const snapshot = await firestore.collectionGroup("posts").get()
	const paths = snapshot.docs.map((doc) => {
		const { slug, username } = doc.data()

		return {
			params: { username, slug },
		}
	})

	return {
		paths,
		fallback: "blocking",
	}
}
