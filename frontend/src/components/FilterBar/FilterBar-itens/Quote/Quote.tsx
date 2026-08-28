import styles from './Quote.style.module.css'

interface Quote {
  id: number
  text: string
  completed: boolean
}

function Quote() {
  
  let quote = localStorage.getItem('quote') ?? "Padrão"
  let quoteAuthor = localStorage.getItem('quoteAuthor') ?? "Padrão"

  const setQuote = (value:string) => {
    localStorage.setItem('quote', value)
    dispatchEvent(new Event("quote"));
  }

  const setQuoteAuthor = (value:string) => {
    localStorage.setItem('quoteAuthor', value)
    dispatchEvent(new Event("quoteAuthor"));
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__internal}>
        <div className={styles.internal__title}>
          <img src="src/assets/images/quoteIcon.png" alt="Quote Icon" />
          <span>Frase de fundo</span>
        </div>
        <div className={styles.internal__subtitle}>
          <span>Frase</span>
        </div>
        <div className={styles.internal__inputadd}>
          <input
            id='quote'
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Digite sua frase..."
            maxLength={150}
            className={styles.internal__input}
          />
        </div>
        <div className={styles.internal__subtitle}>
          <span>Autor</span>
        </div>
        <div className={styles.internal__inputadd}>
          <input
            id='quoteAuthor'
            value={quoteAuthor}
            onChange={(e) => setQuoteAuthor(e.target.value)}
            placeholder="Digite o autor da frase..."
            maxLength={30}
            className={styles.internal__input}
          />
        </div>
      </div>
    </div>
  )
}

export default Quote
