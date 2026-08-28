import styles from './VocationalTestModal.module.css'
import { useNavigate } from 'react-router-dom'
import React from 'react'

interface VocationalTestModalProps {
  isOpen: boolean
  onClose: () => void
}

const VocationalTestModal: React.FC<VocationalTestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/careerTest')
  }

  if (!isOpen) return null

  return (
    <div className={styles.divVocationalTestModal}>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
      <h2 className={styles.h2VocationalTestModal}>
        Teste Vocacional Polymathech
      </h2>
      <img
        className={styles.imgVocationalTestModal}
        src="src/assets/images/VocationalTestModalElements.png"
        alt=""
      />
      <span className={styles.spanVocationalDetail}>
        O teste vocacional da Polymathech foi cuidadosamente desenvolvido para
        ajudar indivíduos a descobrir seu potencial profissional e direcionar
        suas escolhas de carreira de maneira mais precisa. Inspirado no modelo
        da Teoria das Inteligências Múltiplas de Howard Gardner, nosso teste
        oferece uma análise abrangente e personalizada.
        <br />
        <br />
        Como funciona: Por meio de perguntas simples e intuitivas sobre sua
        vida, interesses e habilidades, nosso teste mapeia seus pontos fortes e
        áreas de interesse. Ao correlacionar suas respostas com as diversas
        inteligências propostas por Gardner, identificamos as áreas onde você
        demonstra maior aptidão e potencial.
      </span>
      <button className={styles.startButton} onClick={handleButtonClick}>
        Iniciar Teste
      </button>
    </div>
  )
}

export default VocationalTestModal
