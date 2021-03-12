import Card from "./Card";

const PostsList = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="col-md-4 mt-3">
          <Card post={post} />
        </div>
      ))}
    </>
  );
};

export default PostsList;
