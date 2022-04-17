import React from "react";
import styled from "styled-components";
import { colors } from "../../constants";

interface PropsType {
  children: React.ReactNode;
  isShow: boolean;
}
const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;

  &.isShow {
    display: block;
  }

  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.flashWhite};
    padding: 51px 56px;
    border-radius: 20px;
  }
`;

const Modal: React.FC<PropsType> = ({ children, isShow }) => {
  return (
    <StyledDiv className={isShow ? "active" : ""}>
      <div className='inner'>{children}</div>
    </StyledDiv>
  );
};

export default Modal;
