import React from "react";
import styled from "styled-components";
import { colors, breakpoints } from "../../constants";

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

      @media (max-width: ${breakpoints.bpTablet}px) {
        display: none;
      }
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

      @media (max-width: ${breakpoints.bpTablet}px) {
        display: block;
      }

      @media (max-width: ${breakpoints.bpTablet}px) {
        text-align: center;
        padding: 9px 13px;
      }

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

        @media (max-width: ${breakpoints.bpTablet}px) {
          border-width: 0 12px 12px;
          top: -12px;
          margin-left: -12px;
        }

        @media (max-width: ${breakpoints.bpTablet}px) {
          border-width: 0 8px 8px;
          top: -8px;
          margin-left: -8px;
        }
      }

      > span {
        color: ${colors.shadowBlue};
        font-size: 18px;
        font-weight: 700;

        @media (max-width: ${breakpoints.bpTablet}px) {
          font-size: 15px;
        }

        &:last-of-type {
          color: ${colors.yankeesBlue};
          font-size: 32px;

          @media (max-width: ${breakpoints.bpTablet}px) {
            font-size: 24px;
            display: block;
          }
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
