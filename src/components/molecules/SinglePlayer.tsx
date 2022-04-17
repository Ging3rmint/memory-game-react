import React from "react";
import styled from "styled-components";

import { colors } from "../../constants";

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

    span {
      font-weight: 700;

      &:first-of-type {
        color: ${colors.shadowBlue};
        font-size: 18px;
      }

      &:last-of-type {
        color: ${colors.yankeesBlue};
        font-size: 32px;
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
