import styled from "styled-components";

export const StyledButton = styled.button<{ active?: boolean }>`
  margin-top: 16px;
  border: none;
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
`;
