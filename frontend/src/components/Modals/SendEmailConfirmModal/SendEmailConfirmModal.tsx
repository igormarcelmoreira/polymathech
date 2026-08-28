import styles from './SendEmailConfirmModal.module.css'

interface SendEmailConfirmModalProps {
  isOpen: boolean
  onClose: () => void
}

const SendEmailConfirmModal: React.FC<SendEmailConfirmModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.div}>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
      <h2>Resultado Enviado</h2>
      <h4>Um email com seus resultados foi enviado para você!</h4>
      <button className={styles.okButton} onClick={onClose}>
        OK
      </button>
    </div>
  )
}

export default SendEmailConfirmModal
