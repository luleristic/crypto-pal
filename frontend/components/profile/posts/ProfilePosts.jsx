import AddPost from "./AddPost";
import PostsGrid from "./PostsGrid";

function ProfilePosts() {
  return (
    <>
      <AddPost></AddPost>
      <hr style={{ marginTop: "30px" }} />
      <PostsGrid></PostsGrid>
    </>
  );
}

export default ProfilePosts;
