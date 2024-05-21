import { Square, PieceSymbol, Color } from 'chess.js'
import { useState } from 'react'
import { Move } from './gamePage'
import MoveTable from './MoveTable'
import { MOVE } from './message'

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

    // const isMyTurn = myColor === chess.turn()
    const isMyTurn = playerColor === chess.turn()

    return (
        <div className="flex">
            <div className="mr-10">
                {moves.length > 0 && <div className="mt-4"> <MoveTable moves={moves} /> </div>}
            </div>
            <div className='text-white-200'>
                {board.map((row, i) => {
                    return <div className='flex' key={i}>
                        {row.map((square, j) => {
                            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square
                            return <div 
                                onClick={() => {
                                    if (!from && square?.color !== chess.turn()) {
                                        return
                                    }
                                    if (!isMyTurn) {
                                        return
                                    }
                                    if (from === squareRepresentation) {
                                        setFrom(null)
                                    }
                                    if (!from) {
                                        setFrom(squareRepresentation)
                                    } else {
                                        try {
                                            setTo(squareRepresentation)
                                            socket.send(JSON.stringify({
                                                type: MOVE,
                                                payload: {
                                                    move: {
                                                        from,
                                                        to: squareRepresentation
                                                    }
                                                }
                                            }))
                                            setFrom(null)
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
                                        } catch (error) {
                                            console.error(error)
                                        }
                                    }
                                }}
                                key={j} className={`w-16 h-16 ${(i + j) % 2 === 0 ? "bg-green-500" : "bg-white"}`}>
                                <div className="flex felx-col justify-center h-full">
                                    {square ? square?.type : ""}
                                </div>
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}
