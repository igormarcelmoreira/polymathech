// src/components/Modals/RecoverPasswordModal/RecoverPasswordModal.tsx
import axios from 'axios'
import { useState } from 'react'
import styles from './RecoverPasswordModal.module.css'

interface RecoverPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSend: () => void
}

const RecoverPasswordModal: React.FC<RecoverPasswordModalProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [email, setEmail] = useState('')
  if (!isOpen) return null

  const handleSend = () => {
    if (email === '') {
      alert('Preencha a aba com seu email')
      return
    }

    axios.post(`${import.meta.env.VITE_APP_API_URL}:${import.meta.env.VITE_APP_API_PORT}/login/forgot-password`, { email }).then(
      (response) => {
        setEmail('')
        onClose() // Fecha o modal atual
        onSend() // Abre o próximo modal
      },
      (err) => {
        console.log('Erro ao enviar email', err)
      },
    )
  }

  return (
    <div className={styles.div}>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
      <h2>Digite o seu email</h2>
      <h4>Digite o email da sua conta Polymathech para recuperar sua senha</h4>
      <input
        type="text"
        placeholder="Email"
        value={email}
        className={styles.input}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className={styles.sendButton} onClick={handleSend}>
        ENVIAR
      </button>
    </div>
  )
}

export default RecoverPasswordModal
