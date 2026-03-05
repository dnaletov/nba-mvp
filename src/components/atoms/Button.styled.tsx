import styled from "styled-components";

export const StyledButton = styled.button<{ $active?: boolean }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  background: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--card-bg)"};
  color: ${({ $active }) => ($active ? "#fff" : "var(--text-muted)")};
  border: 1px solid
    ${({ $active }) => ($active ? "transparent" : "var(--border-color)")};
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 12px rgba(201, 8, 42, 0.3)" : "none"};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ $active }) =>
      $active ? "var(--accent)" : "rgba(255, 255, 255, 0.1)"};
    color: #fff;
    transform: translateY(-2px);
    border-color: ${({ $active }) =>
      $active ? "transparent" : "rgba(255, 255, 255, 0.2)"};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.75rem;
  }
`;
