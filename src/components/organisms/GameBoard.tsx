import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";

import Piece from "../atoms/Piece";

interface LocationState {
  gameConfig: {
    theme: string;
    players: number;
    grid: number;
  };
}

const StyledSection = styled.section`
  width: 100%;

  .row {
    display: flex;
    justify-content: center;

    > button {
      margin: 10px;
    }
  }
`;

const timeToNormalize = 200;

const GameBoard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { gameConfig } = location.state as LocationState;
  const col = gameConfig.grid || 4;

  const pieces = [4, 10, 20, 3, 2, 1, 4, 10, 20, 3, 2, 1, 16, 8, 32, 21];

  const piecesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedPieces, setSelectedPieces] = useState<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (selectedPieces.length >= 2) {
      let isCorrect = false;

      if (selectedPieces[0].innerHTML === selectedPieces[1].innerHTML) {
        console.log("correct, do something else");
        isCorrect = true;

        selectedPieces.map((element) => {
          element.classList.add("active");
        });
      }

      setTimeout(() => {
        selectedPieces[0].classList.remove("selected");
        selectedPieces[1].classList.remove("selected");

        if (!isCorrect) {
          selectedPieces[0].innerHTML = "";
          selectedPieces[1].innerHTML = "";
        }
      }, timeToNormalize);

      setSelectedPieces([]);
    }
  }, [selectedPieces]);

  const onPieceClickHandler = (id: number) => {
    const targetElement = piecesRef.current[id];
    const number = pieces[id];

    if (targetElement && !targetElement.classList.contains("active")) {
      setSelectedPieces([...selectedPieces, targetElement]);
      targetElement.classList.add("selected");
      targetElement.innerHTML = number.toString();
    }
  };

  return (
    <StyledSection>
      {[...Array(col)].map((e, i) => {
        return (
          <div key={i} className='row'>
            {pieces.map((number: number, index: number) => {
              if (index >= i * col && index < i * col + col) {
                return (
                  <Piece
                    pieceRef={(ref: HTMLButtonElement) =>
                      (piecesRef.current[index] = ref)
                    }
                    key={index}
                    id={index}
                    onClick={() => onPieceClickHandler(index)}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </StyledSection>
  );
};

export default GameBoard;
