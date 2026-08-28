import { TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Botao } from '../../../Buttons/ButtonSample'
import styles from './Background.style.module.css'

function BackgroundManager() {
  const [selectedElement, setSelectedElement] = useState<number>(0)
  
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

  const handleItemClick = (element: number) => {
    setSelectedElement(element)
  }

  const checkItem = (item: number) => {
    return selectedElement === item
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__internal}>
        <div className={styles.internal__title}>
          <img src="src/assets/images/Img_box.png" alt="" />
          Background
        </div>
        <TableRow>
          <Botao
            onClick={() => handleItemClick(0)}
            text={'Dia'}
            className={checkItem(0) ? styles.internal__filtro : styles.no_internal__filtro}
          />
          <Botao
            onClick={() => handleItemClick(1)}
            text={'Tarde'}
            className={checkItem(1) ? styles.internal__filtro : styles.no_internal__filtro}
          />
          <Botao
            onClick={() => handleItemClick(2)}
            text={'Noite'}
            className={checkItem(2) ? styles.internal__filtro : styles.no_internal__filtro}
          />
        </TableRow>
        <ul className={checkItem(0) ? styles.internal__list : styles.hidden}>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/diaFloresta.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/diaFloresta.png')}
            />
          </li>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/diaPraia.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/diaPraia.png')}
            />
          </li>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/diaFlores.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/diaFlores.png')}
            />
          </li>
        </ul>
        <ul className={checkItem(1) ? styles.internal__list : styles.hidden}>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/tardeCidade.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/tardeCidade.png')}
            />
          </li>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/tardeFlores.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/tardeFlores.png')}
            />
          </li>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/tardeFloresta.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/tardeFloresta.png')}
            />
          </li>
        </ul>
        <ul className={checkItem(2) ? styles.internal__list : styles.hidden}>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/noiteFloresta.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/noiteFloresta.png')}
            />
          </li>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/noiteLago.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/noiteLago.png')}
            />
          </li>
          <li className={styles.list__item}>
            <img
              src="src/assets/backgrounds/noiteLua.png"
              alt=""
              onClick={() => handleBackground('src/assets/backgrounds/noiteLua.png')}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BackgroundManager
