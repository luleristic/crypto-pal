import { store } from "../app/store";
import { Provider } from "react-redux";

import MainNavbar from "../components/shared/MainNavbar"

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
          <MainNavbar></MainNavbar>
          <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
