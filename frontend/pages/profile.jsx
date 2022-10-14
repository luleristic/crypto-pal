import ProfileLayout from "../components/profile/ProfileLayout";
import UseAuth from "../helpers/UseAuth";

function Profile() {
  return (
    <>
      <UseAuth></UseAuth>
      <ProfileLayout></ProfileLayout>
    </>
  );
}

export default Profile;
