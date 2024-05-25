import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AccountContext } from '../context/accountContext'
import {AddUser} from '../api/user'

function Login() {
  const navigate = useNavigate()
  const { setActiveUser, activeUser } = useContext(AccountContext)

  const loginCredentials = async (res: any) => {
    const decoded = jwtDecode(res.credential)
    if (decoded) {
      toast.success('logged in successfully')
      setActiveUser(decoded)
      setActiveUser(user => ({
        ...user ,
        provider : 'google'
      }))
      console.log(activeUser)
      // await AddUser(activeUser)
      await AddUser({...decoded, provider:'google'})
    }
    navigate('/')
  }

  const loginError = () => {
    toast.error('failed to login')
  }

  return (
    <>
      <div className="login h-[100vh] w-[100vw] bg-[#18191ae8] flex justify-center items-center">
        <div className="login-box position-absolute">
          <GoogleLogin
            onSuccess={loginCredentials}
            onError={loginError}
          />
        </div>
      </div>
    </>
  )
}

export default Login