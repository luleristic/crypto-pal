import { useSelector, useDispatch } from "react-redux";

import {reset, getUser} from '../features/auth/authSlice'
import { useEffect } from "react";

function Dashboard(props) {

  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
  <>
    <h2>Welcome back {user.email}</h2>
  </>);
}

export default Dashboard;
