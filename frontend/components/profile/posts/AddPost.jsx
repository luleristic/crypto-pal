import Image from "next/image";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { userPosts } from "../../../features/posts/postsSlice";
import { handleImageInput } from "../../../helpers/upload";
import { useDispatch } from "react-redux";

import { addPost } from "../../../helpers/api";

function AddPost() {
  const imageFileInput = useRef(null);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const uploadPostHandler = async (event) => {
    const file = await handleImageInput(event, "posts");
    await addPost(file, token);

    const body = {
      username: user.username,
      token
    }
    dispatch(userPosts(body));
  };

  const handleUploadClick = () => {
    imageFileInput.current.click();
  };

  return (
    <>
      <button className="image-button" onClick={handleUploadClick}>
        <Image src="/plus-circle-add.svg" height={60} width={60} />
      </button>
      <input
        type="file"
        ref={imageFileInput}
        onChange={uploadPostHandler}
        style={{ display: "none" }}
      />
    </>
  );
}

export default AddPost;
