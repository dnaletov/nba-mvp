import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--card-bg);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 100%;
`;

const LoadingIndicator: React.FC = () => {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
};

export default LoadingIndicator;
