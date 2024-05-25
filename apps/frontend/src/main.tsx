import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AccountState from './context/accountContext.tsx'

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const clientId = '153879339237-s64u9mbno1kqb07eqah77bgrfqjmarvh.apps.googleusercontent.com'
// console.log(clientId)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId} >
      <AccountState>
        <App />
      </AccountState>
    </GoogleOAuthProvider>
  </BrowserRouter>
)
