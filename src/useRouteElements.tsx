import { useRoutes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'

export default function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    }
  ])
  return routeElement
}
