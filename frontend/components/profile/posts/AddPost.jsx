import Image from "next/image";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { handleImageInput } from "../../../helpers/upload";

import { addPost } from "../../../helpers/api";

function AddPost() {
  const imageFileInput = useRef(null);
  const { token } = useSelector((state) => state.auth);

  const uploadPostHandler = async (event) => {
    const file = await handleImageInput(event, "posts");
    const response = await addPost(file, token);
    console.log(response);
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
