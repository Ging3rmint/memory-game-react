import { forwardRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { colors, breakpoints } from "../../constants";

interface PropsType {
  pieceRef?: any;
  id?: number;
  text?: string | number;
  onClick?: () => void;
  iconName?: IconProp;
  isShow?: boolean;
  isReveal?: boolean;
  isBig?: boolean;
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

  @media (max-width: ${breakpoints.bpLgMobile}px) {
    width: 47px;
    height: 47px;
    font-size: 24px;
  }

  &.large {
    width: 118px;
    height: 118px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      width: 72px;
      height: 72px;
      font-size: 40px;
    }
  }

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
const Piece = forwardRef<HTMLButtonElement, PropsType>(
  ({ text, onClick, iconName, isShow, isReveal, isBig }, ref) => {
    return (
      <StyledButton
        ref={ref}
        className={`${isReveal ? "active" : isShow ? "selected" : ""} ${
          isBig ? "large" : ""
        }`}
        onClick={onClick}
      >
        {(isShow || isReveal) && text && <span>{text}</span>}
        {(isShow || isReveal) && iconName && (
          <FontAwesomeIcon icon={iconName} />
        )}
      </StyledButton>
    );
  }
);
// const Piece = forwardRef<HTMLButtonElement, PropsType>({
//   text,
//   isActive,
//   onClick,
//   pieceRef,
//   iconName,
//   isShow,
// }, ref) => {

// };

export default Piece;
