import Navbar from './components/Navbar'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import Activity from './pages/Activity'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path = "/" element = {<Calendar/>} />
          <Route path = "/calendar" element = {<Calendar/>} />
          <Route path = "/settings" element = {<Settings/>} />
          <Route path = "/activity" element = {<Activity/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
