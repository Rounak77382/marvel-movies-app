import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 32px;
  margin-top: 64px;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 16px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
        <Copyright>
          &copy; {new Date().getFullYear()} Marvel Movies Database. All Rights Reserved.
          <br />
          <small>This website is for informational purposes only. Not affiliated with Marvel Studios or Disney.</small>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;