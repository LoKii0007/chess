export default function MoveTable(moves: any) {
  const index = moves.moves.length
  return (
    <>
      <div className="movetable text-center text-white text-2xl w-[30vw] ">
        <div className="move-top pb-5">
        moves table
        </div>
        {
          index > 0 && <div>
            {moves.moves.slice(index - 1).map((move: any, i: any) => {
              return (
                <div key={i} >
                   Recent move - From : {move.from} To : {move.to}
                </div>
              )
            })}
          </div>
        }
      </div>
    </>
  )
}
