import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: gray;
`;

const LoadingIndicator: React.FC = () => {
  return <LoadingWrapper>Loading...</LoadingWrapper>;
};

export default LoadingIndicator;
