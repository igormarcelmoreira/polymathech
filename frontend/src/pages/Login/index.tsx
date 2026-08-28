// src/pages/Login/index.tsx
import { Botao } from '@/components/Buttons/ButtonSample'
import { Container } from '@/components/Container/Container'
import { Footer } from '@/components/Footers/Footer'
import RecoverPasswordConfirmModal from '@/components/Modals/RecoverPasswordConfirmModal/RecoverPasswordConfirmModal'
import RecoverPasswordModal from '@/components/Modals/RecoverPasswordModal/RecoverPasswordModal'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)

  async function handleLogin() {
    const endpoint = `${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/login`

    if (password.length < 1 || email.length < 1) {
      setError('Complete todos os campos.')
    } else {
      try {
        const response = await axios.post(endpoint, {
          email,
          password,
        })

        const { access_token, user_role } = response.data
        const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000)

        Cookies.set('jwt', access_token, { expires: inOneHour })

        navigate('/home')
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message)
        } else {
          setError('Ocorreu um erro inesperado')
        }
      }
    }
  }

  const handleClickRegister = () => {
    navigate('/register')
  }

  return (
    <div className={styles.bodyBackground}>
      <Container>
        <div className={styles.titleSpace}>
          <img src="src/assets/images/Logo.png" alt="" />
          <h1>Login</h1>
          <p>Entre na sua conta Polymathech</p>
        </div>
        <div className={styles.dataSpace}>
          <input
            className={styles.inputSpace}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.inputSpace}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Correção aplicada aqui
          />
          <button
            className={styles.forgotPass}
            onClick={() => setIsResetModalOpen(true)}
          >
            Esqueci a senha
          </button>
        </div>
        <RecoverPasswordModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onSend={() => setIsConfirmModalOpen(true)}
        />
        <RecoverPasswordConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
        />
        <div className={styles.buttonsSpace}>
          <Botao onClick={handleLogin} text="LOGIN" />
          <Botao
            className={styles.registerButton}
            onClick={handleClickRegister}
            text="REGISTRE-SE"
          />
        </div>
      </Container>
      {error && <p className={styles.errorWarning}>{error}</p>}
      <Footer />
    </div>
  )
}
