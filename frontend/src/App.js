import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

