import React from "react";
import Link from "next/link";
import Head from "next/head";

const post = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className="display-4">{post.title}</h1>
      <p>
        By{" "}
        <span className="text-primary">
          {post.users_permissions_user.username}
        </span>
      </p>
      <img
        src={post.main_image}
        alt="image"
        style={{ width: "50%", height: 250 }}
      />
      <p className="mt-3">{post.post_content}</p>
      <br />
      <Link href="/">
        <button className="btn btn-secondary">Back</button>
      </Link>
    </>
  );
};

// get the page initial props by using server side rendering, means the page is generated on the
//server at first. The function should return props object with the props
export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:1337/posts/${context.params.id}`);
  const main_post = await res.json();

  return {
    props: {
      post: main_post,
    },
  };
};

//! Below is a sample for static site generation including dynamic paths
//! the way we do it is by exporting a function called getStaticPaths and create
//! an array that includes the params and other info

// export const getStaticProps = async (context) => {
//   const res = await fetch(`http://localhost:1337/posts/${context.params.id}`);
//   const main_post = await res.json();

//   return {
//     props: {
//       post: main_post,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`http://localhost:1337/posts/`);
//   const posts = await res.json();

//   const allPaths = posts
//     .map((curr) => curr.id)
//     .map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths: allPaths,
//     fallback: false, // return a 404 page if id not found
//   };
// };

export default post;
