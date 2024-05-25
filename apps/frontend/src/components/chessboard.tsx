import { Square, PieceSymbol, Color } from 'chess.js'
import { useState } from 'react'
import { Move } from '../screens/gamePage'
import { MOVE } from './message'
import toast from 'react-hot-toast'
import '../css/landing.css'

export default function Chessboard({playerColor,  board, socket, chess, setBoard, moves, setMoves }:
    {
        chess: any,
        // myColor: Color
        playerColor : Color ,
        moves: Move[],
        socket: WebSocket,
        setMoves: React.Dispatch<React.SetStateAction<Move[]>>
        board: ({
            square: Square,
            type: PieceSymbol,
            color: Color
        } | null)[][],
        setBoard : any
        // setBoard: React.Dispatch<React.SetStateAction<({
        //     square: Square,
        //     type: PieceSymbol,
        //     color: Color
        // } | null)[][]>>

    }) {

    const [from, setFrom] = useState<null | Square>(null)
    const [to, setTo] = useState<null | Square>(null)
    const [isValid, setIsValid] = useState<false | true>(true)
    const [selectedSquare, setSelectedSquare] = useState<false | true>(false)

    // const isMyTurn = myColor === chess.turn()
    const isMyTurn = playerColor === chess.turn()

    return (
        <div className="flex">
            <div className='text-white-200'>
                {board.map((row, i) => {
                    return <div className='flex' key={i}>
                        {row.map((square, j) => {
                            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square
                            // console.log(squareRepresentation)
                            return <div 
                                onClick={() => {
                                    // console.log('from ',from)
                                    // console.log('sq ', squareRepresentation)
                                    console.log('color : ', square?.color)
                                    if (!from && square?.color !== chess.turn()) {
                                        return
                                    }
                                    if (!isMyTurn) {
                                        return
                                    }
                                    if (from === squareRepresentation ) {
                                        setFrom(null)
                                    }
                                    //update this
                                    if(from && square?.color === playerColor && square.type ){
                                        // console.log('sq color' , square?.color)
                                        // console.log('plr color' , playerColor)
                                        // console.log('sq type ' , square?.type)
                                        setFrom(squareRepresentation)
                                    }
                                    if (!from) {
                                        setFrom(squareRepresentation)
                                        setIsValid(true)
                                        // console.log(from)
                                    } 
                                    else if(from && square?.color === undefined || from && square?.color !== playerColor ){
                                        try {
                                            // console.log('testing move')
                                            setTo(squareRepresentation)
                                            // console.log('to', to)
                                            socket.send(JSON.stringify({
                                                type: MOVE,
                                                payload: {
                                                    move: {
                                                        from,
                                                        to: squareRepresentation
                                                    }
                                                }
                                            }))
                                            chess.move({
                                                from,
                                                to: squareRepresentation
                                            })
                                            setBoard(chess.board())
                                            console.log({
                                                from,
                                                to: squareRepresentation
                                            })
                                            setMoves(moves => [...moves, { from, to: squareRepresentation }])
                                            setFrom(null)
                                        } catch (error) {
                                            setIsValid(false)
                                            toast.error('invalid move')
                                            // console.log(error)
                                        }
                                    }
                                }}
                                key={j} className={`w-20 h-20 ${(i + j) % 2 === 0 ? "bg-[#75A47F]" : "bg-white"} ${from === squareRepresentation && 'selected-square' } `}>
                                <div className="flex felx-col justify-center h-full">
                                    {square ? <img src={`/b${square?.color==='b' && square?.type}.png`} alt="" />: null }
                                    {square ? <img src={`/w${square?.color==='w' && square?.type}.png`} alt="" />: null }
                                </div>
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}
