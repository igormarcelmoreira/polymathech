import { Link } from 'react-router-dom'
import styles from './DiscordModal.module.css'

interface DiscordModalProps {
  isOpen: boolean
  onClose: () => void
}

const DiscordModal: React.FC<DiscordModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className={styles.divDiscordModal}>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
      <h2 className={styles.h2DiscordModal}>
        Se junte ao nosso servidor do Discord para estudar em grupo!
      </h2>
      <Link className={styles.linkSidebar} to="https://discord.gg/A43HdPEdDj" target="_blank" rel="noopener noreferrer">
        <img
          className={styles.imgDiscord}
          src="src/assets/images/DiscordButton.svg"
          alt=""
        />
      </Link>
    </div>
  )
}

export default DiscordModal
