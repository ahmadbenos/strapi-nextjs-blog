import "../styles/globals.css";
import Layout from "../components/Layout";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "../context/reducers";
const store = createStore(allReducers);
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
