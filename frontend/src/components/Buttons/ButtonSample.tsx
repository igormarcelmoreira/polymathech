import styles from './ButtonStyle.module.css'

type ButtonTipos = {
  onClick: () => void
  text: string
  className?: string
}

export function Botao({ onClick, text, className }: ButtonTipos) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {text}
    </button>
  )
}
