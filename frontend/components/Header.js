import React from "react";

const Header = () => {
  return (
    <>
      <h1 className="text-center mt-2">Ahmad's Blog</h1>
      <p className="text-center text-muted">
        Strapi(headless CMS), NextJS, and MongoDB project
      </p>
      <p className="text-center">
        <a href="https://github.com/ahmadbenos/strapi-nextjs-blog">
          By Ahmad Tarabein
          <span className="text-dark">
            <i className="fab fa-github"></i>
          </span>
        </a>
      </p>
    </>
  );
};

export default Header;
