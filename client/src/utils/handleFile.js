// const handleFile = e => {
//   console.log(e.target.size, e.target.type);
//   if (e.target.files && !isFileImage(e.target.files[0])) {
//     return null;
//   } else {
//     const reader = new FileReader();
//     let base64;

import { render } from "react-dom";

//     reader.addEventListener("load", function () {
//       if (reader.result) {
//         base64 = reader.result;
//       }

//       return base64;
//     });

//     return base64;
//   }
// };

const handleFile = async e => {
  if (e.target.files && !isFileImage(e.target.files[0])) {
    return "Image must be of type .png or .jpg";
  } else if (e.target.files[0].size / 1024 / 1024 > 16) {
    console.log("FILE TOO LARGE");
    return "File must be smaller than 16 MB";
  } else {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => resolve(reader);
      reader.onerror = error => reject(error);
    });
  }
};

export const isFileImage = file => {
  const validTypes = ["image/png", "image/jpeg", "image/jpg"];

  return file && validTypes.includes(file.type);
};

export default handleFile;
