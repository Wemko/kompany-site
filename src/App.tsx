import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import CompanyDetailsPage from './pages/CompanyDetailsPage/CompanyDetailsPage';
import HomePage from './pages/HomePage/HomePage';


const theme = createTheme({
  palette: {
    primary: {
      main: "#1EBBD7",
      light: '#ffffff'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<CompanyDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
