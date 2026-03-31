import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CreateStory from './pages/CreateStory'
import StoryChat from './pages/StoryChat'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateStory />} />
        <Route path="/chat" element={<StoryChat />} />
      </Routes>
    </Router>
  )
}

export default App
