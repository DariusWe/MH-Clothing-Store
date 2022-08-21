import styled from "styled-components";
import { Link } from "react-router-dom";

export const SideBarContainer = styled.div`
  position: sticky;
  position: -webkit-sticky; /* Safari */
  // Edge 15 and earlier Versions also don't support sticky. Alternative Solution?
  top: 42px;
  height: 100%;
  min-width: 15vw;
  padding: 4px 60px 0 0;
  //border-right: 1px solid rgb(232, 232, 232);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

export const GenderLink = styled(Link)`
  display: inline-block;
  width: 87px;
  margin: 40px 0 30px 0;
  text-transform: uppercase;
  font-weight: ${(props) => props.fontWeight};
`;

export const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // otherwise the links will span the full width and the border would be not just under the word
`;