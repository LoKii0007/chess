import { useEffect, useState } from 'react'
import Chessboard from './chessboard'
import UseSocket from '../hooks/useSocket'
import { Chess, Square } from 'chess.js'
import { useNavigate, useParams } from 'react-router-dom'
import { GAME_OVER, INIT_GAME, MOVE, OPPONENT_DISCONNECTED } from './message'

export interface Move {
  from : Square ,
  to : Square
}

interface Metadata {
  whitePlayer : {
    id : string,
    name : string
  },
  blackPlayer : {
    id : string,
    name : string
  }
}

export default function GamePage() {

  const socket = UseSocket()
  const {gameId} = useParams()
  // const user = useUser()
  const navigate = useNavigate()

  const [chess , setChess] = useState(new Chess())
  const [gameMetadata , setGameMetadata] = useState<Metadata | null>(null)
  const [board, setBoard] = useState(chess.board())
  const [started, setStarted] = useState(false)
  const [moves , setMoves] = useState<Move[]>([])
  const [playerColor, setPlayerColor] = useState<'b' | 'w'>()
  const [result , setResult] = useState<"WHITE_WINS"| "BLACK_WINS"| "DRAW" | typeof OPPONENT_DISCONNECTED | null >(null)

  useEffect(()=>{
    if(!socket){
      return
    }

    socket.onmessage = (event)=>{
      const message = JSON.parse(event.data)

      switch(message.type){
        case INIT_GAME:
          setBoard(chess.board())
          setStarted(true)  
          setGameMetadata({
            whitePlayer : message.payload.whitePlayer,
            blackPlayer : message.payload.blackPlayer
          })
          setPlayerColor(message.payload.color)
          navigate(`/game/${message.payload.gameId}`)
          break;

        case MOVE:
          const move = message.payload
          chess.move(move)
          setBoard(chess.board())
          setMoves(moves =>[...moves, move])
          // console.log("move made")
          break;

        case GAME_OVER:
          console.log("game over")
          setResult(message.payload.result)
          break

        case OPPONENT_DISCONNECTED:
          setResult(OPPONENT_DISCONNECTED)
          break

      }
    }
  }, [socket, chess ])

  if(!socket){
    return <div className='text-center'>connecting...</div>
  }

  // chessboard = myColor={user.id === gameMetadata?.blackPlayer.id? 'b' : 'w'}

  return (
    <>
       {result && <div className="win text-center">
            {result}
        </div>}
        <div className="">
          blackPlayer : {gameMetadata?.blackPlayer.name} VS whitePlayer : {gameMetadata?.whitePlayer.name} <br />
          { chess.turn() === playerColor ? <div>your turn</div> : <div>opponents turn</div> }
        </div>
       <div className="playchess flex justify-around items-center">
        <div className="play-left">
           <Chessboard moves={moves} playerColor={playerColor} setMoves={setMoves} chess={chess} board={board} setBoard={setBoard} socket={socket} />
        </div>
        <div className="play-right">
            {gameId === 'random' && <button onClick={()=>{
              socket.send(JSON.stringify({
                type:INIT_GAME
              }))
            }} className='p-5 bg-green-400'>play game</button>}
        </div>
       </div>
    </>
  )
}
