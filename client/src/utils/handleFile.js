const handleFile = e => {
  console.log(e.target.size, e.target.type);
  if (e.target.files && !isFileImage(e.target.files[0])) {
    return null;
  } else {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      console.log(reader);
      if (reader.result) {
        return reader.result;
      }
    });

    reader.readAsDataURL(e.target.files[0]);
  }
};

const isFileImage = file => {
  const validTypes = ["image/png", "image/jpeg", "image/jpg"];

  return file && validTypes.includes(file.type);
};

export default handleFile;
