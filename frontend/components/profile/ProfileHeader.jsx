import { useSelector } from "react-redux";

import classes from "./ProfileHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import defaultAvatar from "../../public/profile/male-placeholder-image.jpeg";

function ProfileHeader() {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <>
      <div className={classes.img_holder}>
        <Image
          src={defaultAvatar}
          width={150}
          height={150}
          className={classes.avatar}
        ></Image>
      </div>
      <div className={classes.data_holder}>
        <div className={classes.info}>
          <p>{user.email}</p>
          <Link href="/settings">
            <button>Edit Profile</button>
          </Link>
        </div>
        <div className={classes.stats}>
          <div className={classes.posts}>
            <p>Posts: 0</p>
          </div>
          <div className={classes.friends}>
            <p>Friends: 230</p>
          </div>
        </div>
        <p
          className={classes.fullname}
        >{`${user.firstName} ${user.lastName}`}</p>
      </div>
    </>
  );
}

export default ProfileHeader;
