import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
`;

const LoadingIndicator: React.FC = () => {
  return (
    <LoadingWrapper>
      <img
        src="https://i.pinimg.com/originals/2e/ce/ce/2ececec5431d0a1b7eae4e1acac7c59f.gif"
        alt="Loading..."
      />
    </LoadingWrapper>
  );
};

export default LoadingIndicator;
