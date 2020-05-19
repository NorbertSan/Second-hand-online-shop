import React from "react";
import theme from "utils/theme";
import PropTypes from "prop-types";
import styled from "styled-components";
// COMPONENTS
import Input from "components/atoms/Input";
import Textarea from "components/atoms/Textarea";
import ValidateAlert from "components/atoms/ValidateAlert";

const StyledWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 0 3px grey;
  padding: 10px 30px;
  justify-content: space-between;
  label {
    color: grey;
    font-size: ${theme.fontSize.xs};
    font-weight: bold;
  }
`;
const StyledInput = styled(Input)`
  padding-left: 0;
`;
const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
const StyledValidateAlert = styled(ValidateAlert)`
  margin: 0;
  margin-top: 3px;
`;
const StyledTextarea = styled(Textarea)`
  border: none;
  box-shadow: 0 0 2px grey;
  &:focus {
    border: none;
  }
`;

const ChangeUserInfo = ({ fullName, bio, setFullName, setBio, errors }) => {
  return (
    <>
      <StyledWrapper>
        <StyledField>
          <label>Full name :</label>
          <StyledInput
            spellCheck="false"
            secondary
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <StyledValidateAlert>{errors.fullName}</StyledValidateAlert>
          )}
        </StyledField>
        <StyledField>
          <label>Tell more about yourself :</label>
          <StyledTextarea
            spellCheck="false"
            secondary
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {errors.bio && (
            <StyledValidateAlert>{errors.bio}</StyledValidateAlert>
          )}
        </StyledField>
      </StyledWrapper>
    </>
  );
};

ChangeUserInfo.propTypes = {
  fullName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  setBio: PropTypes.func.isRequired,
  setFullName: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ChangeUserInfo;
