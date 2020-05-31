import React, { useState } from "react";
import styled from "styled-components";
import useGetPurchases from "hooks/useGetPurchases";
import PurchaseItem from "./PurchaseItem";

const StyledWrapper = styled.section`
  margin: 120px auto 30px;
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

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  useGetPurchases(setPurchases, setLoading);
  return (
    <StyledWrapper>
      {loading ? (
        <div>LOADING ...</div>
      ) : purchases.length === 0 ? (
        <div>NO ITEMS...</div>
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
