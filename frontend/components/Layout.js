import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
