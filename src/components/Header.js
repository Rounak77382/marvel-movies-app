import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeaderContainer = styled(motion.header)`
  background-color: ${({ theme, $scrolled }) =>
    $scrolled ? theme.colors.secondary : "transparent"};
  padding: 16px 32px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none"};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <Logo to="/">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            MARVEL<span>MOVIES</span>
          </motion.div>
        </Logo>

        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/timeline">Timeline</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
