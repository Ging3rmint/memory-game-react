import React from "react";
import styled from "styled-components";
import { breakpoints } from "../../constants";

interface PropsType {
  text: string;
  onClick?: () => void;
  className?: string;
}

const StyledButton = styled.button`
  border: none;
  border-radius: 35px;
  text-align: center;
  padding: 16px 0;
  width: 100px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: ${breakpoints.bpLgMobile}px) {
    padding: 11px 0;
  }
`;

const PillButton: React.FC<PropsType> = ({ text, className, onClick }) => {
  return (
    <StyledButton onClick={onClick} className={className}>
      {text}
    </StyledButton>
  );
};

export default PillButton;
