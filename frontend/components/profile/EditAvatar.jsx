import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAvatar } from "../../features/auth/authSlice";

import { editUserAvatar } from "../../helpers/Api";

function EditAvatar() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = user;
  const imageFileInput = useRef(null);

  const handleImageInput = async (event) => {
    const fileUploaded = event.target.files[0];
    const ext = fileUploaded.type.substr(fileUploaded.type.toString().lastIndexOf('/')+1,fileUploaded.type.length);
    const convertedFile = await convertToBase64(fileUploaded);
    console.log(ext);
    const file = {
      userId: id,
      ext,
      image: convertedFile,
      imageName: fileUploaded.name,
    };
    const response = await editUserAvatar(file, token);
    dispatch(setUserAvatar(response.imageInfo.Key));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const editAvatar = () => {
    imageFileInput.current.click();
  };

  return (
    <>
      <button onClick={editAvatar}>Edit Profile Picture</button>
      <input
        type="file"
        ref={imageFileInput}
        onChange={handleImageInput}
        style={{ display: "none" }}
      />
    </>
  );
}

export default EditAvatar;
