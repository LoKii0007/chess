import { WebSocketServer } from 'ws';
import { Gamemanager } from './gameManager';
import { User } from './socketManager';

const wss = new WebSocketServer({port : 8080});
console.log('started websocketserver')

const gameManager = new Gamemanager()

wss.on("connection", function connection(ws){
    gameManager.addUser(new User(ws , 'sjhdbc'))
})
