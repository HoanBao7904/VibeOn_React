import './App.css'
import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import { useContext, useEffect } from 'react'
import { AppContext } from './contexts/app.contexts'
import { localStorageEventTarget } from './utils/auth'
function App() {
  const routerElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('ClearStorage', reset) // lắng nghe event(reset rơi vào vòng đời mount hoặc reset thay đổi)
    return () => {
      localStorageEventTarget.removeEventListener('ClearStorage', reset) // xóa event(reset rơi vào vòng đời unmount:"thoát khỏi page đó")
    }
  }, [reset])
  return (
    <div>
      {routerElements},
      <ToastContainer />
    </div>
  )
}

export default App

// Mount (component xuất hiện lần đầu)	addEventListener	Đăng ký nghe event
// reset thay đổi (re-render)	return (gỡ cũ) → add (thêm mới)	Thay listener cũ bằng mới
// Unmount (component bị gỡ khỏi cây)	return	Gỡ đăng ký, dọn dẹp
