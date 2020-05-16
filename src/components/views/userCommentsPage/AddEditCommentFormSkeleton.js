import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import theme from "utils/theme";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addCommentValidator } from "utils/validators";
// ICON
import { ReactComponent as Icon } from "assets/icons/star.svg";
// COMPONENTS
import Textarea from "components/atoms/Textarea";
import Button from "components/atoms/Button";
import Loader from "react-loader-spinner";
// ANIMATION
import { appearAddComment } from "utils/keyframesAnimations";
// HOOK
import useDetectClickOutside from "hooks/useDetectClickOutside";

const stars = [1, 2, 3, 4, 5];

const StyledWrapper = styled.form`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  border-top: 2px solid grey;
  box-shadow: 0 0 3px grey;
  padding: 20px;
  background: ${theme.colors.whiteish};
  animation: ${appearAddComment} 0.2s ease-in-out 1;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;
const StyledTextarea = styled(Textarea)`
  border: 1px solid ${theme.colors.secondary};
  box-shadow: 0 0 3px ${theme.colors.secondary};
  border-radius: 5px;
  color: grey;
`;
const StyledButton = styled(Button)`
  margin-top: 20px;
  align-self: flex-end;
`;
const StyledStarsWrapper = styled.div`
  display: flex;
  position: relative;
`;
const StyledInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const StyledStar = styled(Icon)`
  width: 17px;
  height: 17px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-right: 5px;
  path {
    fill: grey;
    stroke: #e5e5e5;
  }
  &.filled {
    path {
      fill: ${theme.colors.secondary};
    }
  }
`;
const StyledStarRequired = styled.span`
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  position: absolute;
  left: 0;
  bottom: -20px;
`;
const StyledBodyRequired = styled.span`
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
`;
const StyledAnotherCommentAlert = styled.div`
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
`;

const AddEditCommentFormSkeleton = ({
  handleFunc,
  loading,
  commentContent,
  toggleAddCommentOpen,
  anotherComment,
}) => {
  const { nickName } = useParams();
  const [starsNumber, setStarsNumber] = useState(0);
  const [body, setBodyValue] = useState("");
  const [errors, setErrors] = useState({});
  const addCommentFormRef = useRef(null);
  useDetectClickOutside(addCommentFormRef, toggleAddCommentOpen);
  useEffect(() => {
    if (!commentContent) return;
    commentContent.stars && setStarsNumber(commentContent.stars);
    commentContent.body && setBodyValue(commentContent.body);
  }, [commentContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { stars: starsNumber, body, nickName };
    const errorsFromValidator = addCommentValidator(data);
    if (Object.keys(errorsFromValidator).length > 0)
      setErrors(errorsFromValidator);
    else handleFunc(data);
  };
  return (
    <>
      <StyledWrapper ref={addCommentFormRef} onSubmit={handleSubmit}>
        {errors.body && <StyledBodyRequired>{errors.body}</StyledBodyRequired>}
        {anotherComment && (
          <StyledAnotherCommentAlert>
            It is your next comment under this user.You can have only one.If you
            add new one,it will replace previous one.
          </StyledAnotherCommentAlert>
        )}
        <StyledTextarea
          value={body}
          onChange={(e) => setBodyValue(e.target.value)}
          placeholder={`Rate user ${nickName}`}
        />
        <StyledInnerWrapper>
          <StyledStarsWrapper>
            <>
              {stars.map((star) => (
                <StyledStar
                  onClick={() => setStarsNumber(star)}
                  className={star <= starsNumber && "filled"}
                  key={star}
                  index={star}
                />
              ))}
              {errors.stars && (
                <StyledStarRequired>{errors.stars}</StyledStarRequired>
              )}
            </>
          </StyledStarsWrapper>
          <StyledButton secondary>
            {loading ? (
              <Loader
                type="ThreeDots"
                color={theme.colors.secondary}
                height={15}
                width={60}
              />
            ) : (
              "Submit"
            )}
          </StyledButton>
        </StyledInnerWrapper>
      </StyledWrapper>
    </>
  );
};

AddEditCommentFormSkeleton.propTypes = {
  handleFunc: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleAddCommentOpen: PropTypes.func.isRequired,
  commentContent: PropTypes.object,
  anotherComment: PropTypes.bool,
};

export default AddEditCommentFormSkeleton;
