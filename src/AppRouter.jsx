import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';      
import Quiz from './pages/Quiz';      
import Feedback from './pages/Feedback';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
};

export default AppRouter;
