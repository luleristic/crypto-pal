import { useSelector } from "react-redux";

import classes from "./ProfileHeader.module.css";
import Link from "next/link";

import EditAvatar from "./EditAvatar";
import ShowAvatar from "./ShowAvatar";

function ProfileHeader() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className={classes.img_holder}>
        <ShowAvatar></ShowAvatar>
      </div>
      <div className={classes.data_holder}>
        <div className={classes.info}>
          <p>{user.username}</p>
          <EditAvatar></EditAvatar>
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
