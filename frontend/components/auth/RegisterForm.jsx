import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useRouter } from 'next/router'

import classes from "./RegisterForm.module.css";

function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    username:"",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName , username, email, password } = formData;

  const dispatch = useDispatch();


  const { user, isLoading, isError, isSuccess, message, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || localStorage.getItem('token')) {
      router.push('/');
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
      firstName,
      lastName,
      username,
      email,
      password
    };

    dispatch(register(userData));
  };

  if(isLoading) {
    console.log('loading')
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.input_holder}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="firstName"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className={classes.input_holder}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="lastName"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={onChange}
          />
        </div>
        <div className={classes.input_holder}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={onChange}
          />
        </div>
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
          Submit
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
