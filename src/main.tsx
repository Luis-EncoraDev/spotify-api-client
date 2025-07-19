import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './components/Login.tsx'
import OAuth2Callback from './components/Oauth2Callback.tsx'
import AuthWrapper from './components/AuthWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/oauth2/callback' element={<OAuth2Callback />}/>
      <Route element={<AuthWrapper />}>
            <Route path='/' element={<App/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
