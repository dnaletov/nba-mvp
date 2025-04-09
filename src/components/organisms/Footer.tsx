import { FooterWrapper } from "./Footer.styled";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      © {new Date().getFullYear()} NBA MVP. All Rights Reserved.
    </FooterWrapper>
  );
};

export default Footer;
