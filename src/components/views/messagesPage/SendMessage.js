import React, { useState, useRef } from "react";
import theme from "utils/theme";
import styled from "styled-components";
// ICONS
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import { ReactComponent as RightArrowIcon } from "assets/icons/rightArrow.svg";
import CheckIcon from "assets/icons/successCheck.svg";
// COMP
import Textarea from "components/atoms/Textarea";
import ValidateAlert from "components/atoms/ValidateAlert";
import DownshiftInput from "components/views/navbar/DownshiftInput";
// HOOK
import useSearchUsers from "hooks/useSearchUsers";
// REDUX
import { useDispatch } from "react-redux";
import { sendMessage } from "redux/actions/dataActions";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 7px;
`;
const StyledSpan = styled.span`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
`;
const StyledPlusIcon = styled(PlusIcon)`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  path {
    fill: ${theme.colors.primary};
  }
`;
const StyledAddMessageLabel = styled.div`
  display: flex;
  align-items: center;
`;
const StyledAddMessageForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-top: 25px;
`;
const StyledRecipientInput = styled.div`
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  position: relative;
  span {
    font-size: ${theme.fontSize.s};
    font-weight: 400;
    margin-right: 60px;
  }
  input {
    padding-bottom: 0;
    padding-left: 3px;
    &:focus {
      border-bottom: 1px solid ${theme.colors.primary};
    }
  }
`;
const StyledTextareaWrapper = styled.div`
  margin-top: 50px;
  position: relative;
`;
const StyledTextarea = styled(Textarea)`
  min-height: 70px;
  padding: 5px;
  padding-right: 35px;
  outline: none;
  &:focus {
    border: none;
  }
`;
const StyledSentButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
`;
const StyledSendIcon = styled(RightArrowIcon)`
  width: 100%;
  path {
    fill: ${theme.colors.primary};
  }
`;
const StyledCheckIcon = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;
const StyledValidateAlert = styled(ValidateAlert)`
  position: absolute;
  top: 50%;
  right: 15px;
  width: 70px;
  transform: translateY(-50%);
  text-align: end;
`;

const SendMessage = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [body, setBodyValue] = useState("");
  const [isSentMessageFormOpen, setIsSentMessageFormOpen] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [userNickNameList, setUserNickNameList] = useState([]);
  const handleInputChange = (value) => setInputValue(value);

  const handleElementChange = ({ value: userNickName }) =>
    setRecipient(userNickName);

  const searchType = "user";
  const disableYourself = true;
  useSearchUsers(setUserNickNameList, inputValue, searchType, disableYourself);
  const toggleSentMessageForm = () =>
    setIsSentMessageFormOpen((prevState) => !prevState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipient) {
      dispatch(sendMessage({ recipient, body }));
      setBodyValue("");
      setInputValue("");
      setRecipient(null);
      setIsSentMessageFormOpen(false);
    }
  };
  return (
    <StyledWrapper>
      <StyledAddMessageLabel onClick={toggleSentMessageForm}>
        <StyledPlusIcon />
        <StyledSpan>New message</StyledSpan>
      </StyledAddMessageLabel>
      {isSentMessageFormOpen && (
        <StyledAddMessageForm ref={formRef} onSubmit={handleSubmit}>
          <StyledRecipientInput>
            <span>To :</span>
            <DownshiftInput
              nickNameValue={inputValue}
              handleInputChange={handleInputChange}
              placeholder="User nickname"
              name="nickName"
              searchList={userNickNameList}
              formRef={formRef}
              secondary
              handleElementChange={handleElementChange}
            />
            {recipient ? (
              <StyledCheckIcon src={CheckIcon} alt="checkicon" />
            ) : (
              <StyledValidateAlert>*Required</StyledValidateAlert>
            )}
          </StyledRecipientInput>
          <StyledTextareaWrapper>
            <StyledTextarea
              value={body}
              onChange={(e) => setBodyValue(e.target.value)}
              spellCheck="false"
              placeholder="Type message"
            />
            <StyledSentButton>
              <StyledSendIcon />
            </StyledSentButton>
          </StyledTextareaWrapper>
        </StyledAddMessageForm>
      )}
    </StyledWrapper>
  );
};

export default SendMessage;
