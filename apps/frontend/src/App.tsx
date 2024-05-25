import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './screens/landing'
import GamePage from './screens/gamePage'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/navbar'
import Login from './screens/login'

function App() {

  const location = useLocation()
  const url = '/'

  return (
    <>
      {location.pathname === url && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} > </Route>
        <Route path='/game/:gameId' element={<GamePage />} > </Route>
        <Route path='/login' element={<Login />} > </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
