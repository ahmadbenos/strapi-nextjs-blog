import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Error from "../components/Error";
import { setUser, setLoading, setError } from "../context/actions/index";
import jwt from "jsonwebtoken";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.errorState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLoginSubmit(e) {
    e.preventDefault();
    dispatch(setError(""));
    dispatch(setLoading(true));
    if (password == "" || email == "") {
      dispatch(setLoading(false));
      dispatch(setError("Fill in all info"));
      return;
    }

    const loginRequest = {
      identifier: email,
      password,
    };
    const res = await fetch("http://localhost:1337/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    });
    const data = await res.json();
    if (res.status == 200) {
      localStorage.setItem("token", data.jwt);
      const decoded = jwt.decode(data.jwt, { complete: true });
      const { exp, id, iat } = decoded.payload;
      const newUser = {
        exp,
        id,
        iat,
        username: data.user.username,
      };
      dispatch(setUser(newUser, "login"));
      router.push("/");
      dispatch(setLoading(false));
    } else {
      // we can of course handle error more efficiently by using several status code
      // and also get the error message the server responds with! But error handling is not #1 focus in this project
      dispatch(setLoading(false));
      dispatch(setError("Email/password incorrect"));
    }
  }

  return (
    <>
      {error && <Error error={error} />}
      <form onSubmit={onLoginSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <br />

        <Link href="/" className="text-white">
          <a className="text-white btn btn-danger mt-2">Cancel</a>
        </Link>
      </form>
    </>
  );
};

export default Login;
