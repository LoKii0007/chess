import { useNavigate } from 'react-router-dom'
import '../css/landing.css'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="chess h-[92vh] flex flex-row justify-center items-center">
        <div className="chess-left">
          <img src="/chessboard.png" className='h-[70vh]' alt="" />
        </div>
        <div className="chess-right w-[40vw] h-full flex flex-col justify-center items-center">
          <h1 className='py-5 text-[50px] text-white text-center font-[600] ' >Play chess <br /> online</h1>
          <button onClick={() => navigate(`/game/random`,)} className='text-2xl rounded-full play-btn p-5 px-12 text-white'>Play Online</button>
        </div>
      </div>
    </>
  )
}

export default Landing