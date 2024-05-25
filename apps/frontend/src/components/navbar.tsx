import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountContext } from '../context/accountContext'

export default function Navbar() {

  const { activeUser } = useContext(AccountContext)

  const navigate = useNavigate()

  return (

    <>
      <div className="navbar bg-[#18191ae8] text-white h-[8vh] flex justify-around items-center">
        <div className="nav-left">Chess</div>
        {Object.keys(activeUser).length >0 ? <div>{activeUser?.name} </div> :<button onClick={() => navigate('/login')} className="nav-right">Login</button>}
      </div>
    </>
  )
}
