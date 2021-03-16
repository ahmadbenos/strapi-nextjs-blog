import PostsList from "../components/PostsList";
import Link from "next/link";
import { useSelector } from "react-redux";

function Home({ posts }) {
  const token = useSelector((state) => state.authstate);
  //const { exp, id, iat } = token.user;
  console.log(token);
  return (
    <>
      <div className="text-center">
        <Link href="/signup">Sign Up</Link>
        <br />
        <Link href="/login">Login</Link>
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
