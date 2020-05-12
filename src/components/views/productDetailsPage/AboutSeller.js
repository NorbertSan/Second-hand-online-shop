import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledWrapper = styled.section``;

const AboutSeller = ({ authorInfo }) => {
  return <StyledWrapper>THERE WILL BE AUTHOR INFO</StyledWrapper>;
};

AboutSeller.propTypes = {
  authorInfo: PropTypes.object.isRequired,
};

export default AboutSeller;
