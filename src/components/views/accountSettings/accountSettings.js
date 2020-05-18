import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import { changeUserInfoValidator } from "utils/validators";
// COMPONENTS
import ChangeUserAvatarForm from "./ChangeUserAvatarForm";
import ChangeUserInfo from "./ChangeUserInfo";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import Button from "components/atoms/Button";
import Loader from "react-loader-spinner";
// REDUX STUFF
import { useSelector, useDispatch } from "react-redux";
import { changeUserInfo as changeUserInfoAction } from "redux/actions/userActions";

const StyledWrapper = styled.section`
  padding: 50px 15px 15px 15px;
  margin: 90px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;
const StyledButton = styled(Button)`
  align-self: center;
  margin-top: 30px;
`;

const AccountSettings = () => {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const fullNamePrev = useSelector((state) => state.user.fullName);
  const bioPrev = useSelector((state) => state.user.bio);
  const avatarPrev = useSelector((state) => state.user.avatar);
  const dispatch = useDispatch();
  useEffect(() => {
    fullNamePrev && setFullName(fullNamePrev);
    bioPrev && setBio(bioPrev);
    avatarPrev && setAvatar(avatarPrev);
  }, [fullNamePrev, bioPrev, avatarPrev]);

  const handleSaveChanges = (e) => {
    const data = { fullName, bio, avatar };
    const validateErrors = changeUserInfoValidator(data);
    if (Object.keys(validateErrors).length > 0) setErrors(validateErrors);
    else dispatch(changeUserInfoAction(data, setLoading, setIsChanged));
  };
  return (
    <StyledWrapper>
      <ChangeUserAvatarForm
        initial={fullName.substr(0, 1)}
        avatar={avatar}
        setAvatar={setAvatar}
      />
      <ChangeUserInfo
        errors={errors}
        fullName={fullName}
        bio={bio}
        setFullName={setFullName}
        setBio={setBio}
      />
      <ChangePassword />
      <DeleteAccount />
      <StyledButton onClick={handleSaveChanges} tertiary>
        {isChanged ? (
          "Saved"
        ) : loading ? (
          <Loader
            type="ThreeDots"
            color={theme.colors.blackish}
            height={15}
            width={100}
          />
        ) : (
          "Save changes"
        )}
      </StyledButton>
    </StyledWrapper>
  );
};

export default AccountSettings;
