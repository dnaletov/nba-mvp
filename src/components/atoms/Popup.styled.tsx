import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  background: white;
  border: 3px solid white;
  border-radius: 10px;
  min-width: 320px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: rgb(138, 138, 138);

  &:hover {
    color: rgb(255, 255, 255);
  }
`;
