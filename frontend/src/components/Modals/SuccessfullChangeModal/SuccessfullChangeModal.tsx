import styles from './SuccessfullChangeModal.module.css'

interface SuccessfullChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

const SuccessfullChangeModal: React.FC<SuccessfullChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.div}>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
      <h2 className={styles.h2}>Nova senha criada com sucesso!</h2>
      <img src="src/assets/images/check_ring.png" alt="" />
    </div>
  )
}

export default SuccessfullChangeModal
