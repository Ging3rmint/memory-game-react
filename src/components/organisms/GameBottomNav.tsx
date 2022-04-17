import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

import Player from "../molecules/Player";
import SinglePlayer from "../molecules/SinglePlayer";

interface PropsType {
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

const GameBottomNav: React.FC<PropsType> = ({ currentPlayer, playerScore }) => {
  const location = useLocation();

  const { gameConfig } = location.state as LocationState;
  const [timeToStart, setTimeToStart] = useState(gameConfig.timeToStart);
  const [gameCountDown, setGameCountDown] = useState(gameConfig.gameTimer);
  const [gameTimer, setGameTimer] = useState("0:00");

  const setUpDisplayTime = (timer: number) => {
    let timeInMinutes = Math.floor(timer / 60);
    let timeInSeconds: number | string = timer - timeInMinutes * 60;

    if (timeInSeconds < 10) {
      timeInSeconds = `0${timeInSeconds}`;
    }

    setGameTimer(`${timeInMinutes}:${timeInSeconds}`);
  };

  useEffect(() => {
    setUpDisplayTime(gameCountDown);

    if (timeToStart > 0) {
      const waitTimePtr = setInterval(() => {
        setTimeToStart(timeToStart - 1);
      }, 1000);

      return () => clearInterval(waitTimePtr);
    }

    if (gameCountDown > 0 && timeToStart <= 0) {
      const gameTimerPtr = setInterval(() => {
        setGameCountDown(gameCountDown - 1);
      }, 1000);

      return () => clearInterval(gameTimerPtr);
    }
  }, [gameCountDown, timeToStart]);

  return (
    <StyledNav>
      {gameConfig.players > 1 ? (
        [...Array(gameConfig.players)].map((e, i) => {
          return (
            <Player
              name={`Player ${i + 1}`}
              score={playerScore[`player${i + 1}`]}
              key={i}
              isActive={i + 1 === currentPlayer}
            />
          );
        })
      ) : (
        <SinglePlayer playerScore={playerScore["player1"]} timer={gameTimer} />
      )}
    </StyledNav>
  );
};

export default GameBottomNav;
