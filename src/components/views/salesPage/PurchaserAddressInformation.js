import React from "react";
import theme from "utils/theme";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledAddressInformationWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    font-size: ${theme.fontSize.xs};
    margin-bottom: 3px;
  }
`;
const StyledSpan = styled.span`
  margin-top: 6px;
  font-size: 12px;
  font-weight: bold;
`;

const PurchaserAddressInformation = ({ sale }) => {
  return (
    <>
      <StyledSpan>Address :</StyledSpan>
      <StyledAddressInformationWrapper>
        <li style={{ marginTop: 10 }}>
          City : {sale.addressData.city},{sale.addressData.zipCode}
        </li>
        <li>
          Street : {sale.addressData.street} {sale.addressData.buildingNumber}
        </li>
        {sale.addressData.company && (
          <li>Company : {sale.addressData.company}</li>
        )}
      </StyledAddressInformationWrapper>
    </>
  );
};

PurchaserAddressInformation.propTypes = {
  sale: PropTypes.object.isRequired,
};

export default PurchaserAddressInformation;
