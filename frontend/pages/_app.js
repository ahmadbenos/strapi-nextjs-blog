import "../styles/globals.css";
import Layout from "../components/Layout";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
//tool to activate for redux dev tools in chrome
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "../context/reducers";

//create redux store with combined reducer in reducers indexjs file
const store = createStore(allReducers, composeWithDevTools(applyMiddleware()));
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
