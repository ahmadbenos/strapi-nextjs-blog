import { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "../context/actions";
import jwt from "jsonwebtoken";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decoded = jwt.decode(token, { complete: true });
      const { exp, id, iat } = decoded.payload;
      if (exp * 1000 > Date.now()) {
        const user = { exp, id, iat };
        dispatch(setUser(user, "login"));
      }
    }
    dispatch(setLoading(false));
  }, []);

  return (
    <>
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
