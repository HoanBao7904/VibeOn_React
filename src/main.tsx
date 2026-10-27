import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.contexts.tsx'

const qureyClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // rời khỏi tab khác thì react query không tự động gọi lại
      retry: 0 //khi gọi api thất bại thì không gọi lại (đỡ trường hợp báo lỗi lặp lại nhiều lần)
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={qureyClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)

{
  /* <StrictMode>
    <App />
  </StrictMode> */
}
