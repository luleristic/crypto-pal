import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userPosts } from "../../../features/posts/postsSlice";
import classes from "./PostsGrid.module.css";
import Post from "./Post";

function PostsGrid() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { personalPosts, isLoading, isError, isSuccess } = useSelector((state) => state.posts)

  useEffect(() => {
    if(user.username && token) {
      const body = {
        username: user.username,
        token
      }
      dispatch(userPosts(body));
    }
  }, [user.username, dispatch, userPosts]);

  return (
    <div className={classes.grid}>
      {isSuccess && personalPosts.map((post) => (
        <Post key={post._id} src={post.src}></Post>
      ))}
    </div>
  );
}

export default PostsGrid;
