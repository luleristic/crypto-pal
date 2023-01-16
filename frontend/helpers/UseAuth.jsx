import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset, setToken, getUser } from "../features/auth/authSlice";
import { useRouter } from "next/router";

import axios from "axios";

function UseAuth() {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.entries(user).length === 0) {
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
            if (!response.data && !response.data.user._id) {
              localStorage.removeItem("token");
              router.push("/login");
            }
          })
          .catch((error) => {
            //Throw an error page here
            console.log(error);
          });
        dispatch(getUser(storedToken.token))
          .unwrap()
          .then(() => dispatch(reset()));
      }
    }
  }, []);
}

export default UseAuth;
