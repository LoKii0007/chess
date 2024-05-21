import { div } from "three/examples/jsm/nodes/Nodes.js"

export default function MoveTable(moves:any) {
  const index = moves.moves.length
  return (
    <>
      moves table <br />

      {
        index>0?<div>
          {moves.moves.slice(index-1).map((move : any , i : any)=>{
            return(
              <div  key={i} >
                from : {move.from}, to : {move.to}
              </div>
            )
          })}
          </div>:""
      }
    </>
  )
}
