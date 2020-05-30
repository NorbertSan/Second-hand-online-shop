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
  ${({ black }) =>
    black &&
    css`
      background: ${theme.colors.blackish};
      color: ${theme.colors.whiteish};
      border-radius: 0;
      font-weight: bold;
      font-size: ${theme.fontSize.s};
    `}
  ${({ transparent }) =>
    transparent &&
    css`
      color: ${theme.colors.blackish}!important;
      border: 1px solid ${theme.colors.blackish};
      border-radius: 0;
      background: transparent;
      font-weight: bold;
    `}
    ${({ small }) =>
      small &&
      css`
        padding: 5px 10px;
        font-size: ${theme.fontSize.xs}!important;
      `}
`;

export default Button;
