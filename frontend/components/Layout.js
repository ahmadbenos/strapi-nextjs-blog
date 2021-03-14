import Header from "./Header";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isLoading = useSelector((state) => state.loading);
  return (
    <>
      <Header />
      {isLoading ? (
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
