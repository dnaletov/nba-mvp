import styled from "styled-components";

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  background-color: rgb(182, 182, 182);
  overflow-y: auto;
  height: 100vh;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: green;
  height: 40px;
  width: 100px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const TextContainer = styled.p`
  height: 20px;
`;
