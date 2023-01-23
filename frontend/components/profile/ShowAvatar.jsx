import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserAvatarUrl } from "../../features/auth/authSlice";
import Image from "next/image";
import defaultAvatar from "../../public/profile/male-placeholder-image.jpeg";
import classes from "./ShowAvatar.module.css";

function ShowAvatar() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      imageKey: user.avatar,
    };
    if (token && body.imageKey) {
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
      <Image
        src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
        width={150}
        height={150}
        className={classes.avatar}
        priority={true}
      ></Image>
    </>
  );
}

export default ShowAvatar;
