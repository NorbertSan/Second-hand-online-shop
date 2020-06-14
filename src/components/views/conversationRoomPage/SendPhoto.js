import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const SendPhoto = ({ fileInputRef, setImage, setErrors }) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setErrors({});
    if (!file.type.includes("image/"))
      return setErrors({ image: "Invalid format of photo" });
    const formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", file, file.name);
    try {
      const {
        data: { success, image },
      } = await axios.post("/uploadImage", formData, config);
      if (success) {
        setImage(image);
      } else {
        alert("Failed to save the Image in Server");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <input type="file" ref={fileInputRef} onChange={handleChange} hidden />
  );
};
SendPhoto.propTypes = {
  fileInputRef: PropTypes.object || PropTypes.null,
  setImage: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default SendPhoto;
