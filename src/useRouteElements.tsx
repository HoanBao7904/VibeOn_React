import { useRoutes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Me from './pages/Me'
import MainLayout from './layout/MainLayout/MainLayout'
import EditProfile from './pages/EditProfile'
import LoginOauth from './pages/LoginOauth'
import Home from './pages/Home'
import EmailVerifyPending from './pages/EmailVerifyPending'

export default function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/login/oauth',
      element: <LoginOauth />
    },
    {
      path: '/me',
      element: (
        <MainLayout>
          <Me />
        </MainLayout>
      )
    },
    {
      path: '/me/edit/',
      element: <EditProfile />
    },
    {
      path: '/verify-email',
      element: <EmailVerifyPending />
    }
  ])
  return routeElement
}
