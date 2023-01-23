import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./posts/ProfilePosts";

import classes from "./ProfileLayout.module.css";

function ProfileLayout() {
  return (
    <>
      <div className={`container ${classes.contain}`}>
        <div className={classes.layout}>
          <ProfileHeader></ProfileHeader>
        </div>
        <div className={classes.posts_layout}>
          <ProfilePosts></ProfilePosts>
        </div>
      </div>
    </>
  );
}

export default ProfileLayout;
