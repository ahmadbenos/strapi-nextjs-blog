import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../context/actions";
import { useRouter } from "next/router";

function getCategoryID(category) {
  switch (category) {
    case "tech":
      return "60455b9363bee21ac0ba41e4";
    case "finance":
      return "60455aed63bee21ac0ba41e3";
    case "health":
      return "60455ada63bee21ac0ba41e2";
    case "lifestyle":
      return "60455bac63bee21ac0ba41e5";
    case "sport":
      return "60455aa463bee21ac0ba41e1";
    default:
      return "60455bac63bee21ac0ba41e5";
  }
}

const add = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const user = authState.user;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [category, setCategory] = useState("");
  const submitPost = async (e) => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newPost = {
      title,
      post_content: content,
      main_image: imgLink,
      category: {
        title: category,
        id: getCategoryID(category),
        _id: getCategoryID(category),
      },
      users_permissions_user: {
        username: user.username,
        id: user.id,
        _id: user.id,
        provider: "local",
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
          <label>Title</label>
          <input
            required
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <input
            required
            type="text"
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image Link</label>
          <input
            required
            type="text"
            className="form-control"
            onChange={(e) => setImgLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="custom-select"
            id="inputGroupSelect01"
          >
            <option selected disabled value="0">
              Choose...
            </option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="sport">Sport</option>
            <option value="tech">Technology</option>
          </select>
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
