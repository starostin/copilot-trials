import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ListEmployees from './components/ListEmployees'
import EmployeeDetails from './components/EmployeeDetails'
import AddEmployee from './components/AddEmployee'
import Navigation from './components/Navigation'

function App() {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListEmployees />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/details/:id" element={<EmployeeDetails />} />
      </Routes>
    </div>
  )
}

export default App
