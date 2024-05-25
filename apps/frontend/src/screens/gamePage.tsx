import { useEffect, useState } from 'react'
import Chessboard from '../components/chessboard'
import UseSocket from '../hooks/useSocket'
import { Chess, Square } from 'chess.js'
import { useNavigate, useParams } from 'react-router-dom'
import { CHECKMATE, GAME_OVER, INIT_GAME, MOVE, OPPONENT_DISCONNECTED } from '../components/message'
import MoveTable from '../components/MoveTable'
import '../css/landing.css'
import toast from 'react-hot-toast'

export interface Move {
  from: Square,
  to: Square
}

interface Metadata {
  whitePlayer: {
    id: string,
    name: string
  },
  blackPlayer: {
    id: string,
    name: string
  }
}

export default function GamePage() {

  const socket = UseSocket()
  const { gameId } = useParams()
  // const user = useUser()
  const navigate = useNavigate()

  const [chess, setChess] = useState(new Chess())
  const [gameMetadata, setGameMetadata] = useState<Metadata | null>(null)
  const [board, setBoard] = useState(chess.board())
  const [started, setStarted] = useState(false)
  const [moves, setMoves] = useState<Move[]>([])
  const [playerColor, setPlayerColor] = useState<'b' | 'w'>()
  const [result, setResult] = useState<"WHITE_WINS" | "BLACK_WINS" | "DRAW" | typeof OPPONENT_DISCONNECTED | null>(null)

  // const

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board())
          setStarted(true)
          setGameMetadata({
            whitePlayer: message.payload.whitePlayer,
            blackPlayer: message.payload.blackPlayer
          })
          setPlayerColor(message.payload.color)
          navigate(`/game/${message.payload.gameId}`)
          break;

        case MOVE:
          const move = message.payload
          chess.move(move)
          setBoard(chess.board())
          setMoves(moves => [...moves, move])
          // console.log("move made")
          break;

        case CHECKMATE:
          // handleCheckmate()
          console.log('check')
          toast.error('check by opponent')
          break

        case GAME_OVER:
          console.log("game over")
          setResult(message.payload.result)
          break

        case OPPONENT_DISCONNECTED:
          setResult(OPPONENT_DISCONNECTED)
          break
      }
    }
  }, [socket, chess])

  const handlePlayOnline = () => {
    setStarted(true)
  }

  if (!socket) {
    return <div className='text-center'>connecting...</div>
  }

  // chessboard = myColor={user.id === gameMetadata?.blackPlayer.id? 'b' : 'w'}

  return (
    <div className='gamePage bg-[#232528e8] h-[100vh] flex flex-col justify-evenly '>
      <div className="gamePage-top text-center text-white text-3xl ">
        <div className="player-names">
          {gameMetadata?.blackPlayer.name} &nbsp; {gameId !== 'random' && 'vs'} &nbsp;  {gameMetadata?.whitePlayer.name} <br />
        </div>
        {result &&
          <div className="win text-center">
            {result}
          </div>}
      </div>

      <div className="gamePage-bottom flex justify-center items-center">
        <div className="chessboard p-5">
          <Chessboard moves={moves} playerColor={playerColor} setMoves={setMoves} chess={chess} board={board} setBoard={setBoard} socket={socket} />
        </div>

        <div className="game-details p-12 flex flex-col justify-evenly items-center">
          {!started && <button onClick={() => {
            socket.send(JSON.stringify({
              type: INIT_GAME
            }))
            handlePlayOnline()
          }} className='p-5 play-btn px-12 rounded-full '>play game</button>}

          <div className="turn text-4xl py-5">
            {gameId !== 'random' && <div>{chess.turn() === playerColor ? <div className=' text-green-600'>Your Turn</div> : <div className=' text-red-600'>Opponent's Turn</div>}</div>}
          </div>

          {started && gameId === 'random' && <div className='text-white text-xl'>waiting for oppponent...</div>}

          <div className='text-center text-white text-2xl pb-5'>
            {gameId !== 'random' && playerColor === 'b' ? 'Black Player' : 'White Player'}
          </div>
          
          {gameId !== 'random' && <MoveTable moves={moves} />}
        </div>

      </div>
    </div >
  )
}
