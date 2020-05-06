import styled, { css } from "styled-components";
import theme from "utils/theme";

const Button = styled.button`
  outline: none;
  background: ${theme.colors.secondary};
  padding: 10px;
  border-radius: 5px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.whiteish}!important;
  text-transform: uppercase;
  border: none;
  letter-spacing: 1px;
  font-size: ${theme.fontSize.s}!important;
  ${({ secondary }) =>
    secondary &&
    css`
      border: 1px solid ${theme.colors.secondary};
      color: ${theme.colors.secondary}!important;
      background: ${theme.colors.whiteish};
      font-weight: bold;
    `}
`;

export default Button;
