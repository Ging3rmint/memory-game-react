import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
import PillButton from "../atoms/PillButton";
import { useNavigate } from "react-router";
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

const StyledModalContent = styled.div`
  text-align: center;

  > h2 {
    color: ${colors.charcoal};
    font-size: 48px;
    margin-bottom: 16px;
  }

  > p {
    color: ${colors.shadowBlue};
    font-size: 18px;
    margin-bottom: 40px;
  }

  .row {
    padding: 17px 32px;
    width: 542px;
    border-radius: 10px;
    margin: 0;

    &: first-of-type {
      margin-bottom: 16px;
    }
  }

  .button-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    .btn {
      width: 264px;
      font-weight: 700;
      font-size: 20px;

      &--restart {
        background-color: ${colors.tangerine};
        color: ${colors.lotion};

        &:hover {
          opacity: 0.8;
        }
      }

      &--new {
        background-color: ${colors.gray};
        color: ${colors.yankeesBlue};

        &:hover {
          background-color: ${colors.lakeBlue};
          color: ${colors.lotion};
        }
      }
    }
  }
`;

const SinglePlayer: React.FC<PropsType> = ({ playerScore, timer }) => {
  const navigate = useNavigate();
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
      <Modal isShow={false}>
        <StyledModalContent>
          <h2>You did it!</h2>
          <p>Game over! Here's how you got on...</p>
          <div className='row'>
            <span>Time Elapsed</span>
            <span>1:53</span>
          </div>
          <div className='row'>
            <span>Moves Taken</span>
            <span>39 Moves</span>
          </div>
          <div className='button-group'>
            <PillButton
              className='btn btn--restart'
              text='Restart'
              onClick={() => window.location.reload()}
            />
            <PillButton
              className='btn btn--new'
              text='Setup New Game'
              onClick={() => navigate("/")}
            />
          </div>
        </StyledModalContent>
      </Modal>
    </StyledDiv>
  );
};

export default SinglePlayer;
