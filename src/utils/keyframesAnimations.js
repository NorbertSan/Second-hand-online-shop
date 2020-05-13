import { keyframes } from "styled-components";
export const pulse = keyframes`
	0% {
		transform: scale(0.85);
		box-shadow: 0 0 0 0 rgba(0, 144, 158, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 144, 158, 0);
	}

	100% {
		transform: scale(0.85);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
`;

export const menuAppear = keyframes`
  0%{
    transform:translateY(-50px);
  }
  50%{
    transform:translateY(8px);
  }
  100%{
    transform:translateY(0);
  }
`;
