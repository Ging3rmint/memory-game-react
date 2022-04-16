import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants";

interface PropsType {
  pieceRef?: any;
  id?: number;
  text?: string | number;
  className?: string;
  onClick?: () => void;
}
const StyledButton = styled.button`
  width: 82px;
  height: 82px;
  border-radius: 100%;
  font-size: 44px;
  font-weight: 700;
  color: ${colors.lotion};
  border: none;
  cursor: pointer;
  background-color: ${colors.yankeesBlue};

  &.selected {
    background-color: ${colors.tangerine};
  }

  &:hover:not(.selected, .active) {
    background-color: ${colors.lakeBlue};
  }

  &.active {
    background-color: ${colors.periwinkle};
    cursor: default;
  }
`;

const Piece: React.FC<PropsType> = ({ text, className, onClick, pieceRef }) => {
  return (
    <StyledButton ref={pieceRef} className={className} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Piece;
