import ProfileHeader from './ProfileHeader'

import classes from './ProfileLayout.module.css'

function ProfileLayout() {
  return (
    <div className={`container ${classes.contain}`}>
        <div className={classes.layout}>
            <ProfileHeader></ProfileHeader>
        </div>
    </div>
  )
}

export default ProfileLayout