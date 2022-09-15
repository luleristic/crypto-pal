import LoginForm from './LoginForm';

import classes from './LoginLayout.module.css'
import logo from '../../public/logo.svg'
import Image from 'next/image'

function LoginLayout() {
  return (
    <>
      <div className="container">
        <div className={classes.login_layout}>
          <div className={classes.heading}>
            <Image src={logo} alt=""  width="90px" height="90px" />
            <h3>CryptoPal</h3>
            <p>Where magic happens</p>
          </div>
          <LoginForm></LoginForm>
        </div>
      </div>
    </>
  );
}

export default LoginLayout;
