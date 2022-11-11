import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;

  .slide-menu-enter {
    transform: translateX(30vw);
  }
  .slide-menu-enter-active {
    transform: translateX(0);
    transition: all 0.3s;
  }
  .slide-menu-exit {
    transform: translateX(0);
  }
  .slide-menu-exit-active {
    transform: translateX(30vw);
    transition: all 0.3s;
  }
  .dark-overlay-enter {
    opacity: 0;
  }
  .dark-overlay-enter-active {
    opacity: 1;
    transition: all 0.2s;
  }
  .dark-overlay-exit {
    opacity: 1;
  }
  .dark-overlay-exit-active {
    opacity: 0;
    transition: all 0.2s;
  }
`;

export const ContentArea = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;



