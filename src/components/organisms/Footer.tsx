import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: #2d3748;
  width: 100%;
  position: fixed;
  bottom: 0;
  color: white;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      © {new Date().getFullYear()} NBA MVP. All Rights Reserved.
    </FooterWrapper>
  );
};

export default Footer;
