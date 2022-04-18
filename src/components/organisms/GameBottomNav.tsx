import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { colors, breakpoints } from "../../constants";
import { getWindowDimension } from "../../utils/windowDimension";

import PillButton from "../atoms/PillButton";
import Player from "../molecules/Player";
import SinglePlayer from "../molecules/SinglePlayer";
import Modal from "../molecules/Modal";

interface PropsType {
  showResult: boolean;
  currentPlayer?: number;
  playerScore: {
    [propName: string]: number;
  };
}

interface LocationState {
  gameConfig: {
    theme: string;
    players: number;
    grid: number;
    timeToNormalise: number;
    timeToStart: number;
    gameTimer: number;
  };
}

const StyledNav = styled.nav`
  display: flex;
  max-width: 1110px;
  padding: 0 20px;
  position: fixed;
  bottom: 70px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
`;

const StyledModalContent = styled.div`
  text-align: center;

  > h2 {
    color: ${colors.charcoal};
    font-size: 48px;
    margin-bottom: 16px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      font-size: 24px;
      margin-bottom: 9px;
    }
  }

  > p {
    color: ${colors.shadowBlue};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 40px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      font-size: 14px;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.gray};
    padding: 17px 32px;
    width: 542px;
    border-radius: 10px;
    margin-bottom: 16px;

    &.highlight {
      background-color: ${colors.charcoal};
      span {
        &:first-of-type,
        &:last-of-type {
          color: ${colors.lotion};
        }
      }
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      width: 279px;
      padding: 11px 16px;
      margin-bottom: 8px;
      border-radius: 5px;
    }

    span {
      font-weight: 700;

      &:first-of-type {
        color: ${colors.shadowBlue};
        font-size: 18px;

        @media (max-width: ${breakpoints.bpLgMobile}px) {
          font-size: 13px;
        }
      }

      &:last-of-type {
        color: ${colors.yankeesBlue};
        font-size: 32px;

        @media (max-width: ${breakpoints.bpLgMobile}px) {
          font-size: 20px;
        }
      }
    }
  }

  .button-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      display: block;
      margin-top: 20px;
    }

    .btn {
      width: 264px;
      font-weight: 700;
      font-size: 20px;

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        font-size: 18px;
      }

      &--restart {
        background-color: ${colors.tangerine};
        color: ${colors.lotion};

        &:hover {
          opacity: 0.8;
        }

        @media (max-width: ${breakpoints.bpLgMobile}px) {
          margin-bottom: 16px;
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

const MultiPlayerModalContent: React.FC<{
  navigate: any;
  playerScore: {
    [propName: string]: any;
  };
}> = ({ navigate, playerScore }) => {
  //modal is already mounted. playerScore is a state which re-renders the variables
  const playerScoreArr: { player: string; score: number }[] = [];
  let highestScore = 0;
  let itsTie = false;

  Object.keys(playerScore).forEach((key, index) => {
    if (playerScore[key] > highestScore) {
      highestScore = playerScore[key];
    }

    playerScoreArr.push({
      player: `Player ${index + 1}`,
      score: playerScore[key],
    });
  });

  playerScoreArr.sort((a, b) => {
    return b.score - a.score;
  });

  if (
    playerScoreArr.length &&
    playerScoreArr[0].score === playerScoreArr[1].score
  ) {
    itsTie = true;
  }

  return (
    <StyledModalContent>
      {playerScoreArr.length && (
        <h2>{itsTie ? "Its a tie!" : `${playerScoreArr[0].player} Wins!`}</h2>
      )}
      <p>Game over! Here are the results...</p>
      {playerScoreArr.length &&
        playerScoreArr.map((player) => {
          return (
            <div
              key={player.player}
              className={`row ${
                player.score === highestScore ? "highlight" : ""
              }`}
            >
              <span>
                {player.player}{" "}
                {player.score === highestScore ? "(Winner!)" : ""}
              </span>
              <span>{player.score} Pairs</span>
            </div>
          );
        })}

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
  );
};

const SinglePlayerModalContent: React.FC<{
  navigate: any;
  timeElapsed: string;
  moves: number;
  title: string;
}> = ({ navigate, timeElapsed, moves, title }) => {
  return (
    <StyledModalContent>
      <h2>{title}</h2>
      <p>Game over! Here's how you got on...</p>
      <div className='row'>
        <span>Time Elapsed</span>
        <span>{timeElapsed}</span>
      </div>
      <div className='row'>
        <span>Moves Taken</span>
        <span>{moves} Moves</span>
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
  );
};
const GameBottomNav: React.FC<PropsType> = ({
  currentPlayer,
  playerScore,
  showResult,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameCountUp = useRef(0);
  const gameOverTitle = useRef("You did it!");
  const gameCounterPtr = useRef<NodeJS.Timer>();

  const { gameConfig } = location.state as LocationState;
  const [timeToStart, setTimeToStart] = useState(gameConfig.timeToStart);
  const [gameCountDown, setGameCountDown] = useState(gameConfig.gameTimer);
  const [gameTimer, setGameTimer] = useState("0:00");
  const [modalVisible, setModalVisible] = useState(false);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimension()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimension());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTimeDisplay = (timer: number) => {
    let timeInMinutes = Math.floor(timer / 60);
    let timeInSeconds: number | string = timer - timeInMinutes * 60;

    if (timeInSeconds < 10) {
      timeInSeconds = `0${timeInSeconds}`;
    }

    return `${timeInMinutes}:${timeInSeconds}`;
  };

  useEffect(() => {
    if (gameCounterPtr.current && showResult) {
      clearInterval(gameCounterPtr.current);
    }
  }, [showResult]);

  useEffect(() => {
    if (gameConfig.players > 1) {
      return;
    }

    setGameTimer(getTimeDisplay(gameCountDown));

    if (timeToStart > 0) {
      const waitTimePtr = setInterval(() => {
        setTimeToStart(timeToStart - 1);
      }, 1000);

      return () => clearInterval(waitTimePtr);
    } else if (gameCountDown > 0) {
      const gameTimerPtr = setInterval(() => {
        setGameCountDown(gameCountDown - 1);
        gameCountUp.current = gameCountUp.current + 1;
      }, 1000);

      gameCounterPtr.current = gameTimerPtr;

      return () => {
        if (gameCounterPtr.current) {
          clearInterval(gameCounterPtr.current);
        }
      };
    } else {
      gameOverTitle.current = "Game Over!";
      if (gameCounterPtr.current) {
        clearInterval(gameCounterPtr.current);
      }

      setModalVisible(true);
    }
  }, [gameCountDown, timeToStart]);

  return (
    <StyledNav>
      {gameConfig.players > 1 ? (
        [...Array(gameConfig.players)].map((e, i) => {
          return (
            <Player
              name={`${
                windowDimensions.width > breakpoints.bpLgMobile
                  ? "Player "
                  : "P"
              }${i + 1}`}
              score={playerScore[`player${i + 1}`]}
              key={i}
              isActive={i + 1 === currentPlayer}
            />
          );
        })
      ) : (
        <SinglePlayer playerScore={playerScore["player1"]} timer={gameTimer} />
      )}

      <Modal isShow={modalVisible || showResult}>
        {gameConfig.players > 1 ? (
          <MultiPlayerModalContent
            navigate={navigate}
            playerScore={playerScore}
          />
        ) : (
          <SinglePlayerModalContent
            navigate={navigate}
            timeElapsed={getTimeDisplay(gameCountUp.current)}
            moves={playerScore["player1"]}
            title={gameOverTitle.current}
          />
        )}
      </Modal>
    </StyledNav>
  );
};

export default GameBottomNav;
