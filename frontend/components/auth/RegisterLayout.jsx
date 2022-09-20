import RegisterForm from './RegisterForm';

import classes from './RegisterLayout.module.css'
import logo from '../../public/logo.svg'
import Image from 'next/image'


function RegisterLayout() {
  return (
    <>
      <div className="container">
        <div className={classes.register_layout}>
          <div className={classes.heading}>
            <Image src={logo} alt="" width="90px" height="90px" />
            <h3>CryptoPal</h3>
            <p>Where magic happens</p>
          </div>
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </>
  );
}

export default RegisterLayout;
