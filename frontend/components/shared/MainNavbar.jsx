import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

import Logout from "../auth/Logout";

import classes from "./MainNavbar.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function MainNavbar() {
  const router = useRouter();

  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>CryptoPal</Navbar.Brand>
          <Nav className="mr-auto">
            {token && (
              <>
                <Link href="/">
                  <a className={classes.link}>Dashboard</a>
                </Link>
                <Link href="/inbox">
                  <a className={classes.link}>Inbox</a>
                </Link>
                <Link href="/profile">
                  <a className={classes.link}>Profile</a>
                </Link>
                <Link href="/settings">
                  <a className={classes.link}>Settings</a>
                </Link>
                <Logout>
                  <span className={classes.link}>Logout</span>
                </Logout>
              </>
            )}

            {!token && router.pathname !== "/register" && (
              <Link href="/register">
                <a className={classes.link}> Register</a>
              </Link>
            )}

            {!token && router.pathname !== "/login" && (
              <Link href="/login">
                <a className={classes.link}> Login</a>
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
