import { useEffect, useState } from "react";
import { Button, Styles, TextContainer } from "./ProfilePage.styled";

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
