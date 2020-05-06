import styled from "styled-components";
import theme from "utils/theme";

const ValidateAlert = styled.div`
  font-size: ${theme.fontSize.xs};
  font-weight: bold;
  color: ${theme.colors.secondary};
  width: 90%;
  margin: auto;
  text-align: start;
  margin-bottom: 10px;
`;

export default ValidateAlert;
