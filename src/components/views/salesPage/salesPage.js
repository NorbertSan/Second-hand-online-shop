import React, { useState } from "react";
import styled from "styled-components";
import theme from "utils/theme";
import useGetSales from "hooks/useGetSales";
import Loader from "react-loader-spinner";
import SaleItem from "./SaleItem";

const StyledWrapper = styled.section`
  padding: 50px 15px 15px 15px;
  margin: 100px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;
const StyledLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 200px;
`;
const StyledSalesWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.h3`
  text-align: center;
  position: relative;
  padding-bottom: 10px;
  &:after {
    content: "";
    position: absolute;
    width: 200px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 1px;
    background: ${theme.colors.blackish};
    box-shadow: 0 0 1px ${theme.colors.blackish};
  }
`;

const SalesPage = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  useGetSales(setSales, setLoading);
  return (
    <StyledWrapper>
      {loading ? (
        <StyledLoader
          type="TailSpin"
          color={theme.colors.blackish}
          height={200}
          width={200}
        />
      ) : sales.length === 0 ? (
        <div>no items...</div>
      ) : (
        <StyledSalesWrapper>
          <StyledTitle>Your sales ( {sales.length} )</StyledTitle>
          {sales.map((sale) => (
            <SaleItem sale={sale} key={sale._id} />
          ))}
        </StyledSalesWrapper>
      )}
    </StyledWrapper>
  );
};

export default SalesPage;
