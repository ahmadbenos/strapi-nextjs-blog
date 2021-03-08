import PostsList from "../components/PostsList";
function Home({ posts }) {
  return (
    <>
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
