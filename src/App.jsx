import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from "./Pages/Login/Login.jsx"
import { Home } from "./Pages/Home/Home.jsx"
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Budget from './Components/Budget/Budegt.jsx'
import Investment from './Components/Investment/Investment.jsx'
import Transactions from './Components/Transactions/Transactions.jsx'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="/home/transactions" element={<Transactions />} />
            <Route path="/home/budget" element={<Budget />} />
            <Route path="/home/investment" element={<Investment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
