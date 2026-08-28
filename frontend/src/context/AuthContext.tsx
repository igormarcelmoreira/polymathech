import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('')
  }
  return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    if (storedToken) {
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
