import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  background: var(--bg-dark);
  border-top: 1px solid var(--border-color);
  width: 100%;
  color: var(--text-muted);
  font-size: 0.85rem;
  gap: 12px;

  span {
    color: var(--text-main);
    font-weight: 500;
  }
`;
