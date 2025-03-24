import styled from "styled-components";

interface TPlayerCard {
  name: string;
  position: string;
  team: string;
  points: number;
  imageUrl: string;
  onClick?: () => void;
}

const Card = styled.div`
  display: flex;
  background-color: #2d3748;
  border-radius: 10px;
  padding: 24px;
  max-width: 800px;
  min-width: 320px;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;

  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  color: white;
  margin-left: 16px;
`;

const Name = styled.h2`
  font-size: 1rem;
  margin: 2px;

  ${Card}:first-child & {
    font-size: 1.5rem;
    margin: 5px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 2.5px;
  }
`;

// const Text = styled.p`
//   font-size: 0.8rem;
//   margin: 2px;

//   ${Card}:first-child & {
//     font-size: 1.2rem;
//     margin: 5px;
//   }

//   @media (max-width: 768px) {
//     font-size: 0.8rem;
//   }
// `;

const PlayerCard: React.FC<TPlayerCard> = ({ name, imageUrl, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Image src={imageUrl} alt={`${name} - MVP`} />
      <InfoContainer>
        <Name>{name}</Name>
      </InfoContainer>
    </Card>
  );
};

export default PlayerCard;
