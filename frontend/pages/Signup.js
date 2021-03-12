import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../context/actions/index";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  async function registerUser(e) {
    e.preventDefault();
    if (password !== confirmedPass) return console.log("no match lol");
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
      dispatch(setUser("noice", "signup"));
      router.push("/");
    } else {
      console.log("an error occured!");
    }
  }
  return (
    <>
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
