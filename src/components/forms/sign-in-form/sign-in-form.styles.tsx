import styled from "styled-components";

export const Container = styled.div`
  width: 42rem;
  padding: 6rem;
  text-transform: uppercase;
  background-color: #ececec;
  h1 {
    margin-bottom: 4rem;
    font-size: var(--font-size-xl);
    @media screen and (max-width: 650px) {
      font-size: var(--font-size-l);
    }
  }
  button {
    display: block;
    margin: 1rem 0;
    width: 100%;
  }
`;

// export const ResetPasswordSection = styled.div`
//   font-size: 1.1rem;
//   margin-bottom: 3rem;
//   a {
//     margin-left: 1rem;
//     text-decoration: underline;
//   }
// `;
