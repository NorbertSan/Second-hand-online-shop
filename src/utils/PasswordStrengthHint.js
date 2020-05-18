import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import styled from "styled-components";

const StyledHintPassword = styled.div`
  width: 90%;
  font-size: ${theme.fontSize.xs};
  color: grey;
  margin-bottom: 10px;
  text-align: start;
`;

const PasswordStrengthHint = ({ passwordInputRef }) => {
  const [isHintPasswordShown, toggleHintPasswordShown] = useState(false);
  useEffect(() => {
    const passwordInput = passwordInputRef.current;
    const openHint = () => toggleHintPasswordShown(true);
    const closeHint = () => toggleHintPasswordShown(false);
    passwordInputRef.current.addEventListener("focus", openHint);
    passwordInputRef.current.addEventListener("blur", closeHint);
    return () => {
      passwordInput.removeEventListener("focus", openHint);
      passwordInput.removeEventListener("blur", closeHint);
    };
  }, [passwordInputRef]);
  if (isHintPasswordShown)
    return (
      <StyledHintPassword>
        Password must contain at least six characters, one uppercase, one
        lowercase and one digit
      </StyledHintPassword>
    );
  else return null;
};

PasswordStrengthHint.propTypes = {
  passwordInputRef: PropTypes.object.isRequired,
};

export default PasswordStrengthHint;
