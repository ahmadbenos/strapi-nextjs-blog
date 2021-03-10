import Card from "./Card";

const PostsList = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="col-md-4 mt-3">
          <Card post={post} />
        </div>
      ))}
      {/* <div className="col-md mt-3">
        <Card />
      </div>
      <div className="col-md mt-3">
        <Card />
      </div>
      <div className="col-md mt-3">
        <Card />
      </div> */}
    </>
  );
};

export default PostsList;
