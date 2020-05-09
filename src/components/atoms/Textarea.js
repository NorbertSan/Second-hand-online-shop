import styled from "styled-components";
import theme from "utils/theme";

const Textarea = styled.textarea`
  margin-top: 15px;
  min-height: 70px;
  width: 100%;
  background: ${theme.colors.whiteish};
  resize: none;
  border: none;
  padding: 5px;
  box-shadow: 0 0 1px grey;
  &::placeholder {
    color: grey;
    font-style: italic;
  }
  &:focus {
    border: 1px solid ${theme.colors.secondary};
  }
`;

export default Textarea;
