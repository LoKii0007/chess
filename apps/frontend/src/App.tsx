
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/landing'
import GamePage from './components/gamePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} > </Route>
          <Route path='/game/:gameId' element={<GamePage/>} > </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
