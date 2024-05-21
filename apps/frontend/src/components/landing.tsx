
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
  return (
    <>
          <div className="chess h-[100vh] w-[100vw] flex flex-row justify-evenly items-center">
          <div className="chess-left">
          <img src="/chess.png" className='w-[40vw] h-[70vh]' alt="" />
          </div>
          <div className="chess-right w-[40vw] h-full flex flex-col justify-center items-center">
            <h1 className='py-5' >Play chess online</h1>
          <button onClick={() =>navigate(`/game/random`,)} className='text-2xl bg-green-400 p-5'>Join game</button>
          </div>
      </div>
    </>
  )
}

export default Landing