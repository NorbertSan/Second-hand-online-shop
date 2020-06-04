import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import theme from "utils/theme";
import GreyBackground from "components/atoms/GreyBackground";
import Button from "components/atoms/Button";
import useDetectClickOutside from "hooks/useDetectClickOutside";
import { useDispatch } from "react-redux";
import { blockUser as blockUserAction } from "redux/actions/userActions";

const StyledWrapper = styled.section`
  padding: 30px 15px 20px;
  min-height: 200px;
  min-width: 300px;
  background: ${theme.colors.whiteish};
  box-shadow: 0 0 3px grey;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  text-align: center;
  span {
    &.red {
      color: ${theme.colors.redish};
    }
  }
  p {
    text-align: start;
    font-size: ${theme.fontSize.xs};
  }
`;
const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  button {
    border-radius: 5px;
  }
`;

const BlockUser = ({ setBlockUserOpen, user_id }) => {
  const { nickName } = useParams();
  const blockWindowRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  useDetectClickOutside(blockWindowRef, setBlockUserOpen);
  const handleBlockUser = () => dispatch(blockUserAction(user_id, history));

  return (
    <>
      <GreyBackground />
      <StyledWrapper ref={blockWindowRef}>
        <span>Are you sure to block user </span>
        <span className="red">{nickName}</span>
        <p style={{ marginTop: 20 }}>
          Blocked the user cause hide all products, messages and profile. It
          works in both ways.
        </p>
        <p>You can unblock user in account settings</p>
        <StyledButtonsWrapper>
          <Button small black onClick={() => setBlockUserOpen(false)}>
            Cancel
          </Button>
          <Button small onClick={handleBlockUser}>
            Block
          </Button>
        </StyledButtonsWrapper>
      </StyledWrapper>
    </>
  );
};

BlockUser.propTypes = {
  setBlockUserOpen: PropTypes.func.isRequired,
  user_id: PropTypes.string.isRequired,
};

export default BlockUser;
