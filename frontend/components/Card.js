import React from "react";

const Card = ({ post }) => {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src={post.main_image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="text-primary">{post.users_permissions_user.username}</p>
          <p className="card-text">{post.post_content.substr(0, 100)}...</p>
          <a href={`/post/${post.id}`} className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
