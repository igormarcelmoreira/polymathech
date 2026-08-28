import styles from './ConfirmPasswordChangeModal.module.css'
import confirmacao from 'src/assets/images/confirmacao.png'

interface ConfirmPasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConfirmPasswordChangeModal: React.FC<ConfirmPasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.divConfirmPass}>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
      <div className={styles.texto}>
        <h2 className={styles.h2ConfirmPass}>Nova senha criada com sucesso. </h2>
        <img
          src={confirmacao}
          alt="Imagem com um V com um circulo, sinalizando confirmacao"
          className={styles.Imagem}
        />
      </div>
    </div>
  )
}

export default ConfirmPasswordChangeModal
