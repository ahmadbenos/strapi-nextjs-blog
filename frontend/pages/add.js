import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../context/actions";
import { useRouter } from "next/router";

const add = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const user = authState.user;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgLink, setImgLink] = useState("");
  const submitPost = async (e) => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newPost = {
      title,
      post_content: content,
      main_image: imgLink,
      users_permissions_user: {
        username: user.username,
      },
    };
    const res = await fetch("http://localhost:1337/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
    });
    //const data = await res.json();
    if (res.status == 200) {
      dispatch(setLoading(false));
      router.push("/");
    } else {
      dispatch(setLoading(false));
      dispatch(setError("An error occured!"));
    }
  };
  return (
    <>
      <h1 className="display-4">Add a new Post</h1>
      <form onSubmit={submitPost}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            required
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Content</label>
          <input
            required
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Image Link</label>
          <input
            required
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setImgLink(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br />

        <Link href="/" className="text-white">
          <a className="text-white btn btn-danger mt-2">Cancel</a>
        </Link>
      </form>
    </>
  );
};

export default add;
