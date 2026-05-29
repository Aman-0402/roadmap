import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RoadmapPage from './pages/RoadmapPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoadmapPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
