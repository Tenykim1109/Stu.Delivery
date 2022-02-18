import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
  border-top: 1px solid rgb(25, 25, 25);
  width: 100%;
  position: relative;
  z-index: 100;
  @media (max-width: 768px) {
    padding: 20px 20px;
    padding-bottom: 30px;
  }
`;

const FooterContent = styled.div``;

const FooterLinkContainer = styled.div`
  width: 500px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FooterLinkTitle = styled.h1`
  color: gray;
  font-size: 17px;
`;

const FooterLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 35px;
  @media (max-width: 768px) {
    margin-top: 26px;
  }
`;

const FooterLink = styled.a`
  color: gray;
  font-size: 14px;
  width: 110px;
  margin-bottom: 21px;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const FooterDescContainer = styled.div`
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const FooterDescRights = styled.h2`
  color: white;
  font-size: 14px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinkContainer>
          <FooterLinkTitle>스스파</FooterLinkTitle>
          <FooterLinkContent>
            <FooterLink href="#">Stu.Delivery 소개</FooterLink>
          </FooterLinkContent>
        </FooterLinkContainer>
        <FooterDescContainer>
          <FooterDescRights>
            © 2022 스스파. ALL RIGHTS RESERVED.
          </FooterDescRights>
        </FooterDescContainer>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
