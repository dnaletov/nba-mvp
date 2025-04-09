import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d3748;
  border-radius: 10px;
  padding: 8px;
  max-width: 800px;
  min-width: 320px;
  text-align: center;
`;

export const Name = styled.h2`
  font-size: 2rem;
  color: white;
  margin-bottom: 16px;

  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;

  @media (max-width: 767px) {
    width: 180px;
    height: 180px;
  }
`;

export const InfoContainer = styled.div`
  color: white;
  text-align: left;
`;

export const Text = styled.p`
  font-size: 1.8rem;
  margin: 4px;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;
