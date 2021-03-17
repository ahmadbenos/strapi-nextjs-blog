import PostsList from "../components/PostsList";
import Link from "next/link";
import { useSelector } from "react-redux";

function Home({ posts }) {
  const authState = useSelector((state) => state.authState);
  const user = authState.user;
  function signOut(e) {
    localStorage.removeItem("token");
  }
  //const { exp, id, iat } = token.user;
  return (
    <>
      {!user.hasOwnProperty("iat") ? (
        <div className="text-center">
          <Link href="/signup">Sign Up</Link>
          <br />
          <Link href="/login">Login</Link>
        </div>
      ) : (
        <div className="text-center ">
          <a
            className="alert-link pointer-event"
            style={{ cursor: "pointer" }}
            onClick={signOut}
          >
            Signout
          </a>
        </div>
      )}
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
