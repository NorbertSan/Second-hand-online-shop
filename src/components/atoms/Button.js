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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.s}!important;
  cursor: pointer;
  ${({ secondary }) =>
    secondary &&
    css`
      border: 1px solid ${theme.colors.secondary};
      color: ${theme.colors.secondary}!important;
      background: ${theme.colors.whiteish};
      font-weight: bold;
    `}
  ${({ tertiary }) =>
    tertiary &&
    css`
      border: 1px solid ${theme.colors.blackish};
      color: ${theme.colors.blackish}!important;
      background: ${theme.colors.whiteish};
      font-weight: bold;
    `}
`;

export default Button;
