import Navbar from './components/Navbar'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import Activity from './pages/Activity'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route key = "home" path = "/" element = {<Calendar/>} />
          <Route key = "calendar" path = "/calendar" element = {<Calendar/>} />
          <Route key = "settings" path = "/settings" element = {<Settings/>} />
          <Route key = "activity" path = "/activity" element = {<Activity/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
