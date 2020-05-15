import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// COMPONENTS
import { Facebook, Code } from "react-content-loader";
import MainInformation from "./MainInformation";
import UserProducts from "components/user/UserProducts";
// REACT STUFF
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "redux/actions/userActions";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 150px auto 30px;
  max-width: 960px;
`;
const StyledFacebook = styled(Facebook)`
  margin-top: 30px;
`;

const UserProfilePage = () => {
  const userData = useSelector((state) => state.data.userData);
  const loading = useSelector((state) => state.UI.loadingUserData);
  const { nickName } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData(nickName));
  }, []);
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
