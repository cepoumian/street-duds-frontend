import styled from 'styled-components';

export const LogoStyles = styled.h1`
  font-size: 4rem;
  position: relative;
  z-index: 2;
  background: var(--red, red);
  transform: skew(-7deg);
  margin: 2rem 0 2rem 2rem;

  a {
    font-size: 4rem;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;
