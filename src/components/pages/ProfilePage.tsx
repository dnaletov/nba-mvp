import { useEffect, useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  background-color: rgb(182, 182, 182);
  overflow-y: auto;
  height: 100vh;
`;

const Button = styled.button`
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

const TextContainer = styled.p`
  height: 20px;
`;

const ProfilePage: React.FC = () => {
  const [state, setState] = useState(false);

  const onClickHandler = () => {
    setState((currentState) => !currentState);
  };

  useEffect(() => {
    console.log("TEST");
  }, [state]);

  return (
    <main>
      <Styles>
        <Button onClick={onClickHandler}>Click me</Button>
        <TextContainer>{state && "Hello"}</TextContainer>
      </Styles>
    </main>
  );
};

export default ProfilePage;
