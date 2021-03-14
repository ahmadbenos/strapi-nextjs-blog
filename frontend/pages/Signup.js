import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Error from "../components/Error";
import { setUser, setLoading, setError } from "../context/actions/index";

const Signup = () => {
  const error = useSelector((state) => state.errorState);
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  async function registerUser(e) {
    e.preventDefault();
    dispatch(setError(""));
    dispatch(setLoading(true));
    if (password !== confirmedPass) {
      dispatch(setLoading(false));
      dispatch(setError("Passwords don't match!"));
      return;
    }
    const userInfo = {
      username,
      email,
      password,
    };
    const res = await fetch("http://localhost:1337/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    if (res.status == 200) {
      localStorage.setItem("token", data.jwt);
      const newUser = {
        username: data.user.username,
      };
      dispatch(setUser(newUser, "login"));
      dispatch(setLoading(false));
      router.push("/");
    } else {
      // we can of course handle error more efficiently by using several status code
      // and also get the error message the server responds with! But error handling is not #1 focus in this project
      dispatch(setLoading(false));
      dispatch(setError("Email/username already taken!"));
      console.log("an error occured!");
    }
  }
  return (
    <>
      {error && <Error error={error} />}
      <form onSubmit={registerUser}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            required
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            required
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            required
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confrim password</label>
          <input
            required
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setConfirmedPass(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <br />
        <Link href="/" className="text-white">
          <a className="text-white btn btn-danger mt-2">Cancel</a>
        </Link>
      </form>
    </>
  );
};

export default Signup;
