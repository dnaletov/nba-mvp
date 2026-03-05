import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 80px;
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border-color);
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 64px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  img {
    width: 42px;
    height: 42px;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const Nav = styled.nav`
  /* Nav styles if needed */
`;

export const List = styled.ul`
  display: flex;
  gap: 32px;
  align-items: center;

  a {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-muted);
    position: relative;
    padding: 8px 0;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--primary);
      transition: width 0.3s ease;
    }

    &:hover {
      color: #fff;
      &::after {
        width: 100%;
      }
    }

    &.active {
      color: #fff;
      &::after {
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    gap: 16px;
    a {
      font-size: 0.75rem;
    }
  }
`;
