import { useRoutes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Me from './pages/Me'
import MainLayout from './layout/MainLayout/MainLayout'
import EditProfile from './pages/EditProfile'

export default function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
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
    }
  ])
  return routeElement
}
