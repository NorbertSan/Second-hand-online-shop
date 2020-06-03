import React, { useState, useRef } from "react";
import theme from "utils/theme";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";
// COMPONENTS
import Button from "components/atoms/Button";
import ValidateAlert from "components/atoms/ValidateAlert";
import DefaultAvatar from "utils/DefaultAvatar";
import { useSelector } from "react-redux";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 3px grey;
  padding: 10px 30px;
  justify-content: space-between;
  position: relative;
`;
const StyledButton = styled(Button)`
  font-size: ${theme.fontSize.xs}!important;
`;
const StyledValidateAlert = styled(ValidateAlert)`
  position: absolute;
  bottom: 5px;
  margin: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const ChangeUserAvatarForm = ({ initial, avatar, setAvatar }) => {
  const inputFileRef = useRef(null);
  const [errors, setErrors] = useState({});
  const { nickName } = useSelector((state) => state.user);
  const triggerAvatarChoose = () => inputFileRef.current.click();
  const avatarChange = async (e) => {
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
      const res = await axios.post("/uploadImage", formData, config);
      if (res.data.success) {
        setAvatar(res.data.image);
      } else {
        alert("Failed to save the Image in Server");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <StyledWrapper>
      <DefaultAvatar avatar={avatar} nickName={nickName} changeAvatar />

      <input type="file" ref={inputFileRef} hidden onChange={avatarChange} />
      <StyledButton tertiary onClick={triggerAvatarChoose}>
        Change avatar
      </StyledButton>
      {errors.image && (
        <StyledValidateAlert>{errors.image}</StyledValidateAlert>
      )}
    </StyledWrapper>
  );
};

ChangeUserAvatarForm.propTypes = {
  initial: PropTypes.string.isRequired,
  setAvatar: PropTypes.func.isRequired,
};

export default ChangeUserAvatarForm;
