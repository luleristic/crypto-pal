import { store } from "../app/store";
import { Provider } from "react-redux";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset, setToken, getUser } from "../features/auth/authSlice";
import { useRouter } from "next/router";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

function SetUser({ children }) {
  const router = useRouter();

  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("token"));

    if (!storedToken) {
      router.push("/login");
    }

    if (storedToken) {
      dispatch(setToken(storedToken.token));
      axios
        .get("api/users/me", {
          headers: {
            Authorization: "Bearer " + storedToken.token,
          },
        })
        .then((response) => {
          if (!response.data) {
            router.push("/login");
          }
        });
        
        dispatch(getUser(storedToken.token));
        reset();
    } 
  }, []);

  return <>{children}</>;
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
          <SetUser>
          </SetUser>
          <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
