import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 85px;
  right: 6vw;
  width: 320px;
  height: 160px;
  background-color: white;
  box-shadow: 3px 3px 8px #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  button {
    margin-top: 10px;
  }
`;

// ANMERKUNG: evtl. position absolute durch relative ersetzen, damit das popup relativ zum parent element gesetzt werden kann, wodurch erreicht
// werden kann, dass das popup bündig mit dem Icon abschließt.