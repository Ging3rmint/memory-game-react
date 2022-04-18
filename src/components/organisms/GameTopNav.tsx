import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { colors, breakpoints } from "../../constants";
import { getWindowDimension } from "../../utils/windowDimension";

import PillButton from "../atoms/PillButton";
import Modal from "../molecules/Modal";

const StyledNav = styled.nav`
  display: flex;
  max-width: 1110px;
  padding: 0 20px;
  margin: 0 auto;
  margin-bottom: 85px;
  align-items: center;

  h1 {
    font-weight: 700;
    color: ${colors.charcoal};
    font-size: 40px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      font-size: 24px;
    }
  }

  .row {
    margin-left: auto;

    > .btn {
      padding: 14px 28px;
      width: auto;
      font-size: 20px;
      font-weight: 700;

      &--menu,
      &--restart {
        background-color: ${colors.tangerine};
        color: ${colors.lotion};
        margin-right: 16px;

        &:hover {
          opacity: 0.85;
        }

        @media (max-width: ${breakpoints.bpLgMobile}px) {
          padding: 10px 18px;
          font-size: 16px;
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

const StyledMobileModal = styled.div`
  .btn {
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }

    &--restart {
      background-color: ${colors.tangerine};
      color: ${colors.lotion};

      &:hover {
        opacity: 0.85;
      }
    }

    &--resume,
    &--new {
      background-color: ${colors.gray};

      &:hover {
        background-color: ${colors.lakeBlue};
        color: ${colors.lotion};
      }
    }
  }
`;

const GameTopNav: React.FC = () => {
  const navigate = useNavigate();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimension()
  );
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimension());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledNav>
      <h1>memory</h1>
      <div className='row'>
        {windowDimensions.width > breakpoints.bpLgMobile ? (
          <>
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
          </>
        ) : (
          <>
            <PillButton
              className='btn btn--menu'
              text='Menu'
              onClick={() => setMenuVisible(true)}
            />
            <Modal isShow={isMenuVisible}>
              <StyledMobileModal>
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
                <PillButton
                  className='btn btn--resume'
                  text='Resume Game'
                  onClick={() => setMenuVisible(false)}
                />
              </StyledMobileModal>
            </Modal>
          </>
        )}
      </div>
    </StyledNav>
  );
};

export default GameTopNav;
