import Card from "./Card";

const PostsList = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="col mt-3">
          <Card />
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
