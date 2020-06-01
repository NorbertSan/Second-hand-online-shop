import React, { useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import useGetPurchases from "hooks/useGetPurchases";
// COMP
import Loader from "react-loader-spinner";
import PurchaseItem from "./PurchaseItem";
import NoPurchasesAlert from "./NoPurchasesAlert";

const StyledWrapper = styled.section`
  margin: 150px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;
const StyledPurchasesWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.h3`
  text-align: center;
`;
const StyledLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 200px;
`;

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  useGetPurchases(setPurchases, setLoading);
  return (
    <StyledWrapper>
      {loading ? (
        <StyledLoader
          type="TailSpin"
          color={theme.colors.primary}
          height={200}
          width={200}
        />
      ) : purchases.length === 0 ? (
        <NoPurchasesAlert />
      ) : (
        <StyledPurchasesWrapper>
          <StyledTitle>Your orders</StyledTitle>
          {purchases.map((purchase) => (
            <PurchaseItem purchase={purchase} key={purchase._id} />
          ))}
        </StyledPurchasesWrapper>
      )}
    </StyledWrapper>
  );
};

export default PurchasesPage;
