import { FilterBar } from '@/components/FilterBar/FilterBar';
import BackgroundManager from '@/components/FilterBar/FilterBar-itens/BackgroundManager/BackgroundManager';
import { Footer } from '@/components/Footers/Footer';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import styles from './home.module.css';

export default function Home() {
  const [quote, setQuote] = useState(localStorage.getItem('quote') ?? "Comece de onde você está. Use o que você tiver. Faça o que você puder.");
  const [quoteAuthor, setQuoteAuthor] = useState(localStorage.getItem('quoteAuthor') ?? "Arthur Ashe");
  const [showAudioList, setShowAudioList] = useState(false);

  useEffect(() => {
    // Load the background from local storage on component mount
    const savedBackground = localStorage.getItem('home_background')
    if (savedBackground) {
      handleBackground(savedBackground, false)
    }
  }, [])

  
  function handleBackground(path: string, saveToLocalStorage = true) {
    const homeBackground = document.getElementById('home_background')
    if (homeBackground) {
      homeBackground.style.backgroundImage = `url(${path})`
      homeBackground.style.backgroundSize = 'cover'
      homeBackground.style.backgroundRepeat = 'no-repeat'
      if (saveToLocalStorage) {
        localStorage.setItem('home_background', path)
      }
    }
  }

  useEffect(() => {
    const handleQuoteChange = () => {
      setQuote(
        localStorage.getItem('quote') ??
          'Comece de onde você está. Use o que você tiver. Faça o que você puder.',
      )
    }

    const handleQuoteAuthorChange = () => {
      setQuoteAuthor(localStorage.getItem('quoteAuthor') ?? 'Arthur Ashe')
    }

    window.addEventListener('quote', handleQuoteChange)
    window.addEventListener('quoteAuthor', handleQuoteAuthorChange)

    return () => {
      window.removeEventListener('quote', handleQuoteChange)
      window.removeEventListener('quoteAuthor', handleQuoteAuthorChange)
    }
  }, [])

  const handleAudioListToggle = () => {
    setShowAudioList((prevShowAudioList) => !prevShowAudioList)
  }

  return (
    <div className={styles.bodyBackground} id="home_background">
      <section className={styles.screen}>
        <Sidebar />
        <span className={styles.motivation}>
          <h2>{quote.length > 0 ? '“' + quote + '”' : ''}</h2>
          <h4 className={styles.motivationAuthor}>{quoteAuthor}</h4>
        </span>
        <div className={styles.screen__filterBar}>
          <FilterBar>
            <BackgroundManager />
            <div onClick={handleAudioListToggle}>
              <img src="src/assets/images/Music.png" alt="Music" />
            </div>
          </FilterBar>
        </div>
        <div className={styles.screen__footer}>
          <Footer />
        </div>
      </section>
    </div>
  )
}
