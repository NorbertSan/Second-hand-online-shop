import styled, { css } from "styled-components";
import theme from "utils/theme";

const Input = styled.input`
  padding: 7px 15px;
  background: #eee;
  outline: none;
  border: 1px solid transparent;
  outline: none;
  &::placeholder {
    font-style: italic;
  }
  &:focus {
    border-color: ${theme.colors.secondary};
  }
  ${({ secondary }) =>
    secondary &&
    css`
      background: none;
      border: none;
      border-bottom: 1px solid grey;
    `}
  ${({ tertiary }) =>
    tertiary &&
    css`
      background: ${theme.colors.whiteish};
      box-shadow: 0 0 1px grey;
    `}
`;

export default Input;
