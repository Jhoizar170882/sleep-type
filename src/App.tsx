import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import { ThemeProvider } from '@/context/ThemeContext';
import StarBackground from '@/components/StarBackground';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';
import LandingPage from '@/pages/LandingPage';
import QuizPage from '@/pages/QuizPage';
import ResultPage from '@/pages/ResultPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppInner() {
  return (
    <div className="relative min-h-screen bg-background">
      <StarBackground />
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>
      <AnimatedRoutes />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </BrowserRouter>
  );
}
