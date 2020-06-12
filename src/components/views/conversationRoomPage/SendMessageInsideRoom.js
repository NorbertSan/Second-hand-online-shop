import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { useParams } from "react-router-dom";
import { ReactComponent as RightArrowIcon } from "assets/icons/rightArrow.svg";
// REDUX
import { useDispatch } from "react-redux";
import { sendMessage } from "redux/actions/dataActions";

const StyledWrapper = styled.form`
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  padding-top: 15px;
  z-index: 1;
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
  const formRef = useRef(null);
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
  useEffect(() => {
    const form = formRef.current;
    const enterListener = (e) => e.keyCode === 13 && handleSubmit(e);
    form && form.addEventListener("keyup", enterListener);
    return () => form.removeEventListener("keyup", enterListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledWrapper ref={formRef} onSubmit={handleSubmit}>
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
