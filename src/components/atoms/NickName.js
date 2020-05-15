import styled, { css } from "styled-components";
import theme from "utils/theme";

const NickName = styled.span`
  color: grey;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.xs};
  ${({ big }) =>
    big &&
    css`
      font-size: ${theme.fontSize.s};
    `}
    ${({ large }) =>
      large &&
      css`
        font-size: ${theme.fontSize.l};
      `}
  ${({ black }) =>
    black &&
    css`
      color: ${theme.colors.blackish};
    `}
`;

export default NickName;
