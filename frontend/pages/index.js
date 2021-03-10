import PostsList from "../components/PostsList";
import Link from "next/link";
function Home({ posts }) {
  return (
    <>
      <div className="text-center">
        <Link href="www.google.com">Sign Up</Link>
        <br />
        <Link href="www.google.com">Login</Link>
      </div>
      <h2 style={{ fontFamily: "monospace" }}>All Posts</h2>
      <div className="row">
        <PostsList posts={posts} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:1337/posts`);
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}

export default Home;
