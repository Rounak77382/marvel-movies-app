import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const Main = styled(motion.main)`
  min-height: 100vh;
  padding-top: 80px; // Space for fixed header
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </Main>
      <Footer />
    </>
  );
};

export default Layout;