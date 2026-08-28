import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = `${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/login`

interface LoginResponse {
  access_token: string
}

interface LoginParams {
  email: string
  password: string
}

const login = async ({
  email,
  password,
}: LoginParams): Promise<LoginResponse | null> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL, {
      email,
      password,
    })

    const { access_token } = response.data

    const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000)

    Cookies.set('jwt', access_token, { expires: inOneHour }) // Expires in 1 hour.

    return null
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Login error:', error.response.data.message)
    } else {
      console.error('Ocorreu um erro inesperado')
    }
    return null
  }
}

const AuthService = {
  login,
}

export default AuthService
