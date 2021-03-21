import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../context/actions";
import { useRouter } from "next/router";

// function to determine the id of the category the user inputs
//ids are generated in the strapi content manager, so the ids must match with each category in strapi
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

    //retreive the jwt token
    const token = localStorage.getItem("token");

    // this is the strapi required fields data submission,id must match the category
    // generated in strapi content manage when you first created the backend
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

    // add the jwt token in the request bearer token header to ensure
    // that the request is still from a valid user
    const res = await fetch("http://localhost:1337/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
    });
    //if success redirect to homepage
    if (res.status == 200) {
      dispatch(setLoading(false));
      router.push("/");
    } else {
      dispatch(setLoading(false));
      dispatch(setError("An error occured!"));
    }
  };

  //redirect user to homepage if he's not logged in in case he tries to access
  // the page from the browser url search bar, i did it just by checking if the current user in the
  // redux store has an iat property(means to check if there's a user since an empty objetc return 'true')
  // of course, this can be handled in a better way but just for the time being i did this

  //by better way i mean that we can get the user id from store, send request to server to check if that id is found
  //in the database
  useEffect(() => {
    if (!user.hasOwnProperty("iat")) {
      router.push("/");
    }
  }, []);
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
