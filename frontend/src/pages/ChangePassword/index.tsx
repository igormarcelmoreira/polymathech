import { Botao } from '@/components/Buttons/ButtonSample'
import { Container } from '@/components/Container/Container'
import ConfirmPasswordChangeModal from '@/components/Modals/ConfirmPasswordChangeModal/ConfirmPasswordChangeModal'
import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './ChangePassword.module.css'

export default function ChangePassword() {
  const location = useLocation()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClickRegister = async () => {
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')

    if (token) {
      try {
        await axios.put(`${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/login/reset-password/${token}`, {
          password,
          confirmPassword,
        })
        setMessage('Senha alterada com sucesso!')
        setIsModalOpen(true)
      } catch (error) {
        setMessage('Ocorreu um erro ao alterar a senha')
        // Tratar erros, exibir mensagem de erro, etc.
      }
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    navigate('/login')
  }

  return (
    <Container>
      <div className={styles.div}>
        <div className={styles.titleSpace}>
          <h1 className={styles.h1}>Altere sua senha</h1>
        </div>
        <div className={styles.passwordSpace}>
          <input
            className={styles.input}
            type="password"
            placeholder="Nova Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Botao
          className={styles.registerButton}
          onClick={handleClickRegister}
          text="Salvar"
        />
        {message && <p>{message}</p>}
      </div>
      <ConfirmPasswordChangeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  )
}