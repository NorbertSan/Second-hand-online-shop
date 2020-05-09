import React, { useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import Dropzone from "react-dropzone";
import axios from "axios";

// ICON
import PlusIcon from "assets/icons/plus.svg";
// COMPONENTS
import ValidateAlert from "components/atoms/ValidateAlert";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 15px;
`;
const StyledBox = styled.div`
  width: 160px;
  height: 200px;
  box-shadow: 0 0 1px grey;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.whiteish};
`;
const StyledSlider = styled.div`
  display: flex;
  width: 160px;
  height: 200px;
  overflow-x: scroll;
  box-shadow: 0 0 1px grey;
  background: ${theme.colors.whiteish};
`;
const StyledImage = styled.img`
  width: 80%;
  object-fit: cover;
`;
const StyledIcon = styled.img`
  width: 40px;
  height: 40px;
`;
const StyledValidateAlert = styled(ValidateAlert)`
  position: absolute;
  top: -15px;
  left: 0;
  font-size: ${theme.fontSize.s};
`;

const UploadFile = ({ refreshFunction }) => {
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const onDropHandle = async (files) => {
    setErrors({});
    if (!files[0].type.includes("image/"))
      return setErrors({ image: "Invalid format of photo" });

    if (images.length >= 5)
      return setErrors({ image: "Limit of five images has been exceeded" });
    const formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0], files[0].name);
    try {
      const res = await axios.post("/product/uploadImage", formData, config);
      if (res.data.success) {
        setImages([res.data.image, ...images]);
        refreshFunction([res.data.image, ...images]);
      } else {
        alert("Failed to save the Image in Server");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deleteImage = (e) => {
    setImages(images.filter((image) => image !== e.target.name));
    refreshFunction(images.filter((image) => image !== e.target.name));
  };
  return (
    <StyledWrapper>
      {errors.image && (
        <StyledValidateAlert>{errors.image}</StyledValidateAlert>
      )}
      <Dropzone onDrop={onDropHandle} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <StyledBox {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledIcon src={PlusIcon} alt="plus-icon" />
          </StyledBox>
        )}
      </Dropzone>
      {images.length > 0 && (
        <StyledSlider>
          {images.map((image, index) => (
            <StyledImage
              onClick={deleteImage}
              name={image}
              src={`http://localhost:5000/${image}`}
              alt={`product image ${index}`}
              key={image}
            />
          ))}
        </StyledSlider>
      )}
    </StyledWrapper>
  );
};

export default UploadFile;
