import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAvatar } from "../../features/auth/authSlice";

import { editUserAvatar } from "../../helpers/api";
import { handleImageInput } from "../../helpers/upload";

function EditAvatar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const imageFileInput = useRef(null);

  const uploadImageHandler = async (event) => {
    const file = await handleImageInput(event, 'avatar');
    const response = await editUserAvatar(file, token);
    dispatch(setUserAvatar(response.imageInfo.Key));
  };

  const handleEditClick = () => {
    imageFileInput.current.click();
  }
  return (
    <>
      <button onClick={handleEditClick}>Edit Profile Picture</button>
      <input
        type="file"
        ref={imageFileInput}
        onChange={uploadImageHandler}
        style={{ display: "none" }}
      />
    </>
  );
}

export default EditAvatar;
