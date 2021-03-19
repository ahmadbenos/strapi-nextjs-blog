import { useEffect, useState } from "react";
import Header from "./Header";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "../context/actions";
import jwt from "jsonwebtoken";

const Layout = ({ children }) => {
  // const fetcher = (url) => fetch(url).then((res) => res.json());
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.errorState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decoded = jwt.decode(token, { complete: true });
      const { exp, id, iat } = decoded.payload;
      fetch(`http://localhost:1337/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (exp * 1000 > Date.now()) {
            const user = { exp, id, iat, username: data.username };
            dispatch(setUser(user, "login"));
          }
        });
    }
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Next/Strapi Blog</title>
      </Head>
      <Header />
      {!isLoading ? (
        <>
          <div className="container">{children}</div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="display-3">Loading...</h1>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
