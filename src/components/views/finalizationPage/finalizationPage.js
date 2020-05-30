import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// COMPONENTS
import CirclesNavigation from "./CirclesNavigation";
import FormsNavigation from "./FormsNavigation";

const StyledWrapper = styled.section`
  padding: 15px;
  margin: 120px auto 30px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
`;

const FinalizationPage = () => {
  const [finalizationStep, setFinalizationStep] = useState(1);
  const prevStep = () =>
    setFinalizationStep(finalizationStep <= 1 ? 1 : finalizationStep - 1);
  const nextStep = () =>
    setFinalizationStep(finalizationStep >= 3 ? 3 : finalizationStep + 1);
  return (
    <StyledWrapper>
      <CirclesNavigation finalizationStep={finalizationStep} />
      <FormsNavigation
        prevStep={prevStep}
        nextStep={nextStep}
        finalizationStep={finalizationStep}
      />
    </StyledWrapper>
  );
};

export default FinalizationPage;
