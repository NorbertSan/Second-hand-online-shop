import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// COMPONENTS
import { Facebook, Code } from "react-content-loader";
import MainInformation from "./MainInformation";
import NotFoundPage from "utils/NotFoundPage";
import UserProducts from "components/user/UserProducts";
import FollowSection from "./FollowSection";
// REACT STUFF
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "redux/actions/userActions";
import useDetectUserBlocked from "hooks/useDetectUserBlocked";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
`;
const StyledFacebook = styled(Facebook)`
  margin-top: 30px;
`;

const UserProfilePage = () => {
  const { nickName: loggedUserNickName } = useSelector((state) => state.user);
  const userData = useSelector((state) => state.data.userData);
  const loading = useSelector((state) => state.UI.loadingUserData);
  const [userNotFound, setUserNotFound] = useState(false);
  const { nickName } = useParams();
  const dispatch = useDispatch();
  useDetectUserBlocked(setUserNotFound);
  useEffect(() => {
    dispatch(getUserData(nickName, setUserNotFound));
  }, [nickName, dispatch]);
  if (userNotFound)
    return (
      <NotFoundPage
        title="User not found"
        info="Wrong user name provide or account has been deleted"
      />
    );
  return (
    <StyledWrapper>
      {loading && (
        <>
          <StyledFacebook />
          <Code />
        </>
      )}
      {userData && (
        <>
          <MainInformation userData={userData} />
          {loggedUserNickName === nickName && <FollowSection />}
          <UserProducts
            productsIds={userData.products}
            nickName={userData.nickName}
          />
        </>
      )}
    </StyledWrapper>
  );
};

export default UserProfilePage;
