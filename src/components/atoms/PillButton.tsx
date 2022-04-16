import React from "react";
import styled from "styled-components";

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
`;

const PillButton: React.FC<PropsType> = ({ text, className, onClick }) => {
  return (
    <StyledButton onClick={onClick} className={className}>
      {text}
    </StyledButton>
  );
};

export default PillButton;
