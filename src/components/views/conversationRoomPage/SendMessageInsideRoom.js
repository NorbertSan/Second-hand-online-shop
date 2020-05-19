import React, { useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { useParams } from "react-router-dom";
import Textarea from "components/atoms/Textarea";
import { ReactComponent as RightArrowIcon } from "assets/icons/rightArrow.svg";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "redux/actions/dataActions";

const StyledWrapper = styled.form`
  margin: 50px 15px 0 15px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  padding-top: 15px;
  z-index: 10;
`;
const StyledButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 2px;
  margin: 0;
  margin-left: 5px;
  background: transparent;
  border: none;
`;
const StyledSendIcon = styled(RightArrowIcon)`
  width: 100%;
  path {
    fill: ${theme.colors.primary};
  }
`;
const StyledTextarea = styled.textarea`
  background: #eee;
  border: none;
  padding: 10px;
  outline: none;
  flex: 1;
  border-radius: 5px;
  resize: none;
  min-height: 35px;
`;

const SendMessageInsideRoom = () => {
  const dispatch = useDispatch();
  const [body, setBodyValue] = useState("");
  const { nickName } = useParams();
  const handleChange = (e) => setBodyValue(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.trim().length > 0) {
      dispatch(sendMessage({ recipient: nickName, body }));
      setBodyValue("");
    }
  };
  return (
    <StyledWrapper onSubmit={handleSubmit}>
      <StyledTextarea
        spellcheck="false"
        value={body}
        onChange={handleChange}
        placeholder="Send message"
      />
      <StyledButton>
        <StyledSendIcon />
      </StyledButton>
    </StyledWrapper>
  );
};

export default SendMessageInsideRoom;
