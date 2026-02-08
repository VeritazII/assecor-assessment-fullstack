import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PersonsPage from './pages/PersonsPage';
import PersonPage from './pages/PersonPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/persons" element={<PersonsPage />} />
        <Route path="/persons/:id" element={<PersonPage />} />
        <Route path="/persons/color/:color" element={<PersonPage />} />
        <Route path="/persons/new" element={<PersonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
