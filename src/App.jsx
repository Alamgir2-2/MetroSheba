import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home/Home'
import Directions from './Pages/Routes/Directions'
import { Route, Routes } from 'react-router-dom'
import Header from './Pages/Header'
import BookingPage from './Pages/Ticket/BookTicket'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/routes' element={<Directions/>}></Route>
        <Route path='/book' element={<BookingPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
