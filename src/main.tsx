import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './components/Login.tsx'
import OAuth2Callback from './components/Oauth2Callback.tsx'
import AuthWrapper from './components/AuthWrapper.tsx'
import ArtistAbout from './components/ArtistAbout.tsx'
import AlbumAbout from './components/AlbumAbout.tsx'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme.ts'

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/oauth2/callback' element={<OAuth2Callback />}/>
          <Route element={<AuthWrapper />}>
                <Route path='/' element={<App/>}/>
                <Route path='/artist/:id' element={<ArtistAbout />}/>
                <Route path='/album/:id' element={<AlbumAbout />}/>
          </Route>
        </Routes>
      </BrowserRouter>        
  </ThemeProvider>
)
