import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import classes from "./SettingsForm.module.css";

import { setUser } from "../../features/auth/authSlice";
import { editUser } from "../../helpers/Api";

function SettingsForm() {
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    setFormData(() => ({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
    }));
  }, [user]);

  const { firstName, lastName, email } = formData;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      newFirstName: firstName,
      newLastName: lastName,
      newEmail: email,
      email: user.email,
    };

    const response = await editUser(data, token);

    dispatch(setUser(response));

    router.push("/profile");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className={classes.heading}>
        <h2>Settings</h2>
        <p>Change your user info bellow</p>
      </div>
      <form onSubmit={onSubmitHandler} className={classes.form} name="settings">
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
          <label htmlFor="firstName">Last Name</label>
          <input
            type="lastName"
            name="lastName"
            id="lastName"
            defaultValue={user.lastName}
            onChange={onChange}
          />
        </div>
        <div className={classes.input_holder}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={user.email}
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

export default SettingsForm;
