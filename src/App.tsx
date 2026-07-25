import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import LearningPaths from './pages/LearningPaths';
import Articles from './pages/Articles';
import Community from './pages/Community';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="learning-paths" element={<LearningPaths />} />
          <Route path="articles" element={<Articles />} />
          <Route path="community" element={<Community />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

