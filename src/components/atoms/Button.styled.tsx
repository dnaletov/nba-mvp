import styled from "styled-components";

export const StyledButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#000" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#000")};

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: ${({ active }) => (active ? "#111" : "#ddd")};
  }
  @media (max-width: 768px) {
    padding: 3px;
    border-radius: 4px;
    font-weight: normal;
  }
`;
