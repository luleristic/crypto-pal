import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import classes from "./LoginForm.module.css";

function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      router.push("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if(isLoading) {
    console.log('loading')
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.input_holder}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className={classes.input_holder}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className={classes.submit_button}>
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
