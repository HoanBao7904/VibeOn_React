import type React from 'react'
import { createContext, useState } from 'react'
import type { User } from '~/types/user.type'
import { getAccessToken, getProfile } from '~/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  reset: () => void
}

const init: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  profile: getProfile(),
  setProfile: () => null,
  reset: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(init)
//vì sao thz createContext cần giá trị init:vì khi mà ta không truyền value vào thì sẽ lấy thz init

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(init.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(init.profile)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, profile, setIsAuthenticated, setProfile, reset }}>
      {children}
    </AppContext.Provider>
  )
}
