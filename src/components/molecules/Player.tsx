import React from "react";
import styled from "styled-components";
import { colors } from "../../constants";

interface PropsType {
  name: string;
  isActive?: boolean;
  score?: number;
}

const StyledDiv = styled.div`
  width: 25%;
  margin-right: 25px;

  &:last-of-type {
    margin-right: 0;
  }

  > p {
    display: none;
    text-align: center;
    margin-top: 23px;
    font-size: 13px;
    letter-spacing: 5px;
    font-weight: 700;
    color: ${colors.charcoal};
  }

  &.active {
    .player__wrapper {
      background-color: ${colors.tangerine};

      > span {
        color: ${colors.lotion};

        &:last-of-type {
          color: ${colors.lotion};
        }
      }

      &:before {
        display: block;
      }
    }

    > p {
      display: block;
    }
  }

  .player {
    &__wrapper {
      border-radius: 10px;
      padding: 15px 21px;
      background-color: ${colors.gray};
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        display: block;
        width: 0;
        border-style: solid;
        border-color: ${colors.tangerine} transparent;
        border-width: 0 20px 20px;
        top: -20px;
        left: 50%;
        margin-left: -20px;
        display: none;
      }

      > span {
        color: ${colors.shadowBlue};
        font-size: 18px;
        font-weight: 700;

        &:last-of-type {
          color: ${colors.yankeesBlue};
          font-size: 32px;
        }
      }
    }
  }
`;

const Player: React.FC<PropsType> = ({ name, isActive, score }) => {
  return (
    <StyledDiv className={`${isActive ? "active" : ""}`}>
      <div className='player__wrapper '>
        <span>{name}</span>
        <span>{score}</span>
      </div>
      <p>CURRENT TURN</p>
    </StyledDiv>
  );
};

export default Player;
