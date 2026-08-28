import styles from './RecoverPasswordConfirmModal.module.css'

interface RecoverPasswordConfirmModalProps {
  isOpen: boolean
  onClose: () => void
}

const RecoverPasswordConfirmModal: React.FC<RecoverPasswordConfirmModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.div}>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
      <div className={styles.texto}>
        <h2>Um e-mail de recuperação será enviado caso já exista um cadastro.</h2>
      </div>
    </div>
  )
}

export default RecoverPasswordConfirmModal
