import React, { useEffect, useState } from 'react'

const UseSocket = () => {
  const WS_URL = "ws://localhost:8080"
//   const WS_URL = "https://chess-ws.vercel.app/"
  const [socket ,setSocket] = useState<WebSocket | null>(null)

  useEffect(()=>{
     const ws = new WebSocket(WS_URL)
     ws.onopen = () =>{
        setSocket(ws)
        console.log("connected")
     }

     ws.onclose = ()=>{
        setSocket(null)
        console.log("disconnected")
     }

     return ()=>{
        ws.close()
     }
  }, [])

  return socket
}

export default UseSocket