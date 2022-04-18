import React from "react";
import styled from "styled-components";

import { colors, breakpoints } from "../../constants";

interface PropsType {
  playerScore: number;
  timer: string;
}

const StyledDiv = styled.div`
  display: flex;
  margin: 0 auto;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 255px;
    padding: 17px 24px;
    background-color: ${colors.gray};
    border-radius: 10px;
    margin-right: 30px;

    &:last-of-type {
      margin-right: 0;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      display: block;
      text-align: center;
      width: 151px;
    }

    span {
      font-weight: 700;

      &:first-of-type {
        color: ${colors.shadowBlue};
        font-size: 18px;

        @media (max-width: ${breakpoints.bpLgMobile}px) {
          font-size: 15px;
        }
      }

      &:last-of-type {
        color: ${colors.yankeesBlue};
        font-size: 32px;

        @media (max-width: ${breakpoints.bpLgMobile}px) {
          display: block;
          font-size: 24px;
        }
      }
    }
  }
`;

const SinglePlayer: React.FC<PropsType> = ({ playerScore, timer }) => {
  return (
    <StyledDiv>
      <div className='row'>
        <span>Time</span>
        <span>{timer}</span>
      </div>
      <div className='row'>
        <span>Moves</span>
        <span>{playerScore}</span>
      </div>
    </StyledDiv>
  );
};

export default SinglePlayer;
