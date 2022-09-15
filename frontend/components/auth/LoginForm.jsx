import { useState, useEffect } from 'react';

import classes from './LoginForm.module.css'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.input_holder}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={onChange} />
        </div>
        <div className={classes.input_holder}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={onChange} />
        </div>
        <button type='submit' className={classes.submit_button}>Login</button>
      </form>
    </>
  )
}

export default LoginForm