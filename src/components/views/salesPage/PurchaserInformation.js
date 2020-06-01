import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import theme from "utils/theme";
import styled from "styled-components";

const StyledUserDetailsWrapper = styled.ul`
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
`;
const StyledUserDetailsElement = styled.li`
  font-size: ${theme.fontSize.xs};
  margin-bottom: 3px;
`;
const StyledInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;
const StyledDateInfo = styled.span`
  font-size: ${theme.fontSize.xs};
`;

const PurchaserInformation = ({ sale }) => {
  return (
    <>
      <StyledInnerWrapper>
        <span>Purchaser :</span>
        <StyledDateInfo>{moment(sale.createdAt).calendar()}</StyledDateInfo>
      </StyledInnerWrapper>
      <StyledUserDetailsWrapper>
        <StyledUserDetailsElement style={{ marginTop: 10 }}>
          Fullname : {sale.recipientData.fullName}
        </StyledUserDetailsElement>
        <StyledUserDetailsElement>
          Email : {sale.recipientData.email}
        </StyledUserDetailsElement>
        <StyledUserDetailsElement>
          Telephone : {sale.recipientData.telephoneNumber}
        </StyledUserDetailsElement>
      </StyledUserDetailsWrapper>
    </>
  );
};

PurchaserInformation.propTypes = {
  sale: PropTypes.object.isRequired,
};

export default PurchaserInformation;
