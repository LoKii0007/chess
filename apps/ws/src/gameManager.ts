import { WebSocket } from "ws"
import { Game } from "./Game"
import { INIT_GAME, MOVE, OPPONENT_DISCONNECTED } from "./message"
import { User } from "./socketManager"



export class Gamemanager{
    private games : Game[]
    private users: User[]
    private pendingUser2 : User | null
    private pendingGameId : string | null

    constructor(){
        this.games = []
        this.users = []
        this.pendingUser2 = null
        this.pendingGameId = null
    }

    addUser(user : User){
        this.users.push(user)
        console.log('pushed user : ', user.id)
        this.addHandler(user)
    }

    private addHandler(user : User){
        user.socket.on("message", async (data)=>{

            const message = JSON.parse(data.toString())

            if(message.type == INIT_GAME){
                if(this.pendingUser2){
                    console.log("doosra user bhi aa gaya game start")
                    const game = new Game({id :this.pendingUser2.id , socket : this.pendingUser2.socket} , {id : user.id, socket : user.socket} )
                    this.games.push(game)
                    // creating game in database
                    // game.createGameInDb()
                    this.pendingUser2 = null
                    // this.pendingGameId = null
                }else{
                    // this.pendingGameId = user.userId
                    this.pendingUser2 = user
                    console.log("pahla user aa gaya")
                }
            }

            if(message.type == MOVE){
                const game = this.games.find(game => game.player1.id === user.id || game.player2.id == user.id  )
                game?.makeMove( user.socket , message.payload.move)
            }

            if(message.type === 'join_game'){
                if(message.payload?.gameId){
                    const {payload :{gameId}} = message
                    const avaialableGame = this.games.find(game => game.gameId === gameId)
                    if(avaialableGame){
                        const {player1 , player2 , gameId , board} = avaialableGame
                        if(player1 && player2){
                            user.socket.send(JSON.stringify({
                                type : 'game_full'
                            }))
                            return
                        }
                        else if(!player1){
                            avaialableGame.player1 = user
                            player2.socket.send(JSON.stringify({
                                type : 'opponent_joined'
                            }))
                        }
                        else if(!player2){
                            avaialableGame.player2 = user
                            player1.socket.send(JSON.stringify({
                                type : 'opponent_joined'
                            }))
                        }
                        user.socket.send(JSON.stringify({
                            type : 'game_joined',
                            payload : [
                                gameId, 
                                board
                            ]
                        }))
                    }
                }
            }

        })
    }

    removeUser(socket : WebSocket , userId : string){
        this.users = this.users.filter(user => user.id !== userId )
        const gameIndex = this.games.findIndex(game => game.player1.socket === socket || game.player2.socket === socket)
        if(gameIndex !== -1){
            const game = this.games[gameIndex]
            if(game.player1.socket === socket){
                if(game.player2){
                    //game ends
                    game.player2.socket.send(JSON.stringify({
                        type : OPPONENT_DISCONNECTED
                    }))
                }else{
                    this.games.splice(gameIndex, 1)
                }
        }

            else if(game.player2.socket === socket){
                if(game.player1){
                    //game ends
                    game.player1.socket.send(JSON.stringify({
                        type : OPPONENT_DISCONNECTED
                    }))
                }else{
                    this.games.splice(gameIndex, 1)
                }
            }
        }
    }
}