import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;