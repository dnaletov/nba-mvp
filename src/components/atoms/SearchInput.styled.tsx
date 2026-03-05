import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  font-size: 0.95rem;
  font-family: var(--font-main);
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
  }

  &:focus {
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(201, 8, 42, 0.15);
  }
`;
