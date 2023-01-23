const convertToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

const handleImageInput = async(event, type) => {
  const fileUploaded = event.target.files[0];
  const ext = fileUploaded.type.substr(fileUploaded.type.toString().lastIndexOf('/')+1,fileUploaded.type.length);
  const convertedFile = await convertToBase64(fileUploaded);
  const file = {
    ext,
    image: convertedFile,
    type
  };
  return file;
}

module.exports = {
  handleImageInput
}