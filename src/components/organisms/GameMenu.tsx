import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants";
import { useNavigate } from "react-router";
import PillButton from "../atoms/PillButton";

const StyledSection = styled.section`
  max-width: 654px;
  margin: auto;
  margin-top: 78px;
  padding: 56px;
  border-radius: 20px;
  background-color: ${colors.lotion};

  > p {
    color: ${colors.shadowBlue};
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    margin-top: 32px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  button {
    font-size: 26px;
    padding: 11px 0;
    color: ${colors.lotion};
    background-color: ${colors.periwinkle};

    &.selected {
      background-color: ${colors.yankeesBlue};
    }

    &.btn {
      // transition: all 0.3s ease-in-out;

      &--grid,
      &--theme,
      &--icon {
        width: 256px;
      }

      &--number {
        width: 119px;
      }

      &--grid,
      &--theme,
      &--icon,
      &--number {
        &:hover {
          background-color: ${colors.lakeBlue};
        }
      }

      &--start {
        margin-top: 33px;
        background-color: ${colors.tangerine};
        width: 100%;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
  }
`;

const GameMenu: React.FC = () => {
  const navigate = useNavigate();
  const [gameConfig, setGameConfig] = useState({
    theme: "numbers",
    players: 1,
    grid: 4,
    timeToNormalise: 200,
    timeToStart: 5,
    gameTimer: 120,
  });

  const onButtonClickHandler = (key: string, config: number | string) => {
    if (key === "grid" && typeof config === "number" && config > 4) {
      setGameConfig({
        ...gameConfig,
        timeToStart: gameConfig.timeToStart + 5,
        [key]: config,
      });
    } else {
      setGameConfig({ ...gameConfig, [key]: config });
    }
  };

  const onStartClickHandler = () => {
    navigate("/game", { state: { gameConfig } });
  };

  return (
    <StyledSection>
      <p>Select Theme</p>
      <div className='row'>
        <PillButton
          onClick={() => onButtonClickHandler("theme", "numbers")}
          className={`btn btn--theme ${
            gameConfig.theme === "numbers" ? "selected" : ""
          }`}
          text='Numbers'
        />
        <PillButton
          onClick={() => onButtonClickHandler("theme", "icons")}
          className={`btn btn--icon ${
            gameConfig.theme === "icons" ? "selected" : ""
          }`}
          text='Icons'
        />
      </div>
      <p>Number of Players</p>
      <div className='row'>
        <PillButton
          onClick={() => onButtonClickHandler("players", 1)}
          className={`btn btn--number ${
            gameConfig.players === 1 ? "selected" : ""
          }`}
          text='1'
        />
        <PillButton
          onClick={() => onButtonClickHandler("players", 2)}
          className={`btn btn--number ${
            gameConfig.players === 2 ? "selected" : ""
          }`}
          text='2'
        />
        <PillButton
          onClick={() => onButtonClickHandler("players", 3)}
          className={`btn btn--number ${
            gameConfig.players === 3 ? "selected" : ""
          }`}
          text='3'
        />
        <PillButton
          onClick={() => onButtonClickHandler("players", 4)}
          className={`btn btn--number ${
            gameConfig.players === 4 ? "selected" : ""
          }`}
          text='4'
        />
      </div>
      <p>Grid Size</p>
      <div className='row'>
        <PillButton
          onClick={() => onButtonClickHandler("grid", 4)}
          className={`btn btn--grid ${gameConfig.grid === 4 ? "selected" : ""}`}
          text='4x4'
        />
        <PillButton
          onClick={() => onButtonClickHandler("grid", 6)}
          className={`btn btn--grid ${gameConfig.grid === 6 ? "selected" : ""}`}
          text='6x6'
        />
      </div>
      <PillButton
        onClick={onStartClickHandler}
        className='btn--start'
        text='Start Game'
      />
    </StyledSection>
  );
};

export default GameMenu;
