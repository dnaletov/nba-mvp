import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  margin: 20px;
`;

const LoadingIndicator: React.FC = () => {
  return (
    <LoadingWrapper>
      <img
        src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
        alt="Loading..."
      />
    </LoadingWrapper>
  );
};

export default LoadingIndicator;
