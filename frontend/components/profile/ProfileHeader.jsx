import {  useDispatch, useSelector } from "react-redux";
import {  useEffect } from "react";
import axios from "axios";

import { setUserAvatarUrl } from "../../features/auth/authSlice";
import classes from "./ProfileHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import defaultAvatar from "../../public/profile/male-placeholder-image.jpeg";
import EditAvatar from "./EditAvatar";

function ProfileHeader() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      imageKey: user.avatar,
    };
    if (token && body.imageKey && !user.avatarUrl) {
      axios
        .post("api/posts/getSignedUrl", body, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          //Sets up the image link in JSX bellow
          dispatch(setUserAvatarUrl(response.data.url));
        })
        .catch((error) => {
          console.log(error.data.message);
        });
    }
  }, [user, token]);

  return (
    <>
      <div className={classes.img_holder}>
        <Image
          src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
          width={150}
          height={150}
          className={classes.avatar}
        ></Image>
      </div>
      <div className={classes.data_holder}>
        <div className={classes.info}>
          <p>{user.email}</p>
          <Link href="/settings">
            <button className={classes.edit_profile}>Edit Profile</button>
          </Link>
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
