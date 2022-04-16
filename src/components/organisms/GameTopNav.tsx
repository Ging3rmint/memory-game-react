import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { colors } from "../../constants";

import PillButton from "../atoms/PillButton";

const StyledNav = styled.nav`
  display: flex;
  max-width: 1110px;
  padding: 0 20px;
  margin: 0 auto;
  margin-bottom: 85px;

  h1 {
    font-weight: 700;
    color: ${colors.charcoal};
    font-size: 40px;
  }

  .row {
    margin-left: auto;

    > .btn {
      padding: 14px 28px;
      width: auto;
      font-size: 20px;
      font-weight: 700;

      &--restart {
        background-color: ${colors.tangerine};
        color: ${colors.lotion};
        margin-right: 16px;

        &:hover {
          opacity: 0.85;
        }
      }

      &--new {
        background-color: ${colors.gray};

        &:hover {
          background-color: ${colors.lakeBlue};
          color: ${colors.lotion};
        }
      }
    }
  }
`;

const GameTopNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledNav>
      <h1>memory</h1>
      <div className='row'>
        <PillButton
          className='btn btn--restart'
          text='Restart'
          onClick={() => window.location.reload()}
        />
        <PillButton
          className='btn btn--new'
          text='New Game'
          onClick={() => navigate("/")}
        />
      </div>
    </StyledNav>
  );
};

export default GameTopNav;
