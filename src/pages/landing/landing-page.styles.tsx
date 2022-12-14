import styled from "styled-components";
import { Button } from "../../components";

export const ContainerDesktop = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  padding: 3rem 4rem;
`;

export const ImageSection = styled.div`
  height: 100%;
  width: 70%;
`;

type CSSBackgroundImageProps = {
  $src: string;
};

export const CSSBackgroundImage = styled.span<CSSBackgroundImageProps>`
  display: inline-block;
  height: 100%;
  width: 50%;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.$src})`};
  :first-child {
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
  }
  :nth-child(2) {
    border-top-right-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  }
`;

export const Description = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 3.5rem;
  @media screen and (max-width: 1280px) {
    padding-right: 0.8rem;
  }
  h2 {
    margin-bottom: 1rem;
  }
  span {
    display: block;
    font-style: italic;
    color: #888;
    margin-bottom: 1.5rem;
  }
`;

export const LinkToCollection = styled.p`
  margin-top: 3rem;
  margin-bottom: 0.6rem;
`;

type ContentMobileProps = {
  $currentLocationIsWomen: boolean;
};

export const ContainerMobile = styled.div<ContentMobileProps>`
  width: 100%;
  position: absolute;
  top: 0;
  height: 100vh;
  padding: 0 11vw;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: gray;
  background-image: ${(props) =>
    props.$currentLocationIsWomen
      ? "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15)), url(/product-images/index-women-1.jpg)"
      : "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15)), url(/product-images/index-men-1.jpg)"};
  background-size: cover;
  box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.1) inset;
  h2 {
    margin-bottom: 1rem;
  }
  span {
    display: block;
    font-style: italic;
    color: #ddd;
    margin-bottom: 1.5rem;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 3rem;
  width: 20vw;
  min-width: 16rem;
`;
