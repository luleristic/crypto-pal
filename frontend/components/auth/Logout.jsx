import { useRouter } from "next/router";
import { reset, logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

function Logout(props) {
  const router = useRouter();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    router.push('/login');
  };

  return <a onClick={logoutHandler}>{props.children}</a>;
}

export default Logout;
