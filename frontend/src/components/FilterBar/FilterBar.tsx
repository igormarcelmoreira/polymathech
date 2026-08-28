import React, { useState } from 'react'
import { FilterBarItem } from './FilterBar-itens'
import AudioList from './FilterBar-itens/AudioList/AudioList'
import BackgroundManager from './FilterBar-itens/BackgroundManager/BackgroundManager'
import Goals from './FilterBar-itens/Goals/Goals'
import Pomodoro from './FilterBar-itens/Pomodoro/Pomodoro'
import Quote from './FilterBar-itens/Quote/Quote'
import styles from './FilterBar.style.module.css'

type FilterBarProps = {
  children: React.ReactNode
}

export function FilterBar({ children }: FilterBarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [audioListOpen, setAudioListOpen] = useState<boolean>(false)
  const [pomodoroOpen, setPomodoroOpen] = useState<boolean>(false)
  const [selectedElement, setSelectedElement] = useState<number | null>(null) // State to track selected element

  const handleOpenMenu = () => {
    setSelectedElement(null)
    setMenuOpen(!menuOpen)
    setAudioListOpen(false)
    setPomodoroOpen(false)
  }

  const handleItemClick = (element: number) => {
    if (element === selectedElement) 
    setSelectedElement(null)
    else 
    setSelectedElement(element)

    setAudioListOpen(false)
    setPomodoroOpen(false)
  }

  const handleOpenAudioList = () => {
    setSelectedElement(3)
    setPomodoroOpen(false)
    setAudioListOpen(!audioListOpen)
  }

  const handleOpenPomodoro = () => {
    setSelectedElement(1)
    setAudioListOpen(false)
    setPomodoroOpen(!pomodoroOpen)
  }

  const toggleFullscreen = () => {
    const docElm = document.documentElement
    const isInFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement

    if (isInFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    } else {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullscreen) {
        docElm.webkitRequestFullscreen()
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      }
    }
  }

  const checkItem = (item: number) => {
    return selectedElement === item
  }

  return (
    <>
      <AudioList hidden={!audioListOpen} />
      <Pomodoro hidden={!pomodoroOpen} />
      <div className={styles.container}>
        <img
          src="src/assets/images/FilterBar.png"
          alt=""
          onClick={handleOpenMenu}
        />
        {menuOpen && (
          <>
            <FilterBarItem
              imagePath="src/assets/images/TimeIcon.png"
              active={checkItem(1)}
              click={handleOpenPomodoro}
            />
            <FilterBarItem
              imagePath="src/assets/images/Img_box.png"
              element={<BackgroundManager />}
              active={checkItem(2)}
              click={() => handleItemClick(2)}
            />
            <FilterBarItem
              imagePath="src/assets/images/Music.png"
              active={checkItem(3)}
              click={handleOpenAudioList}
            />
            <FilterBarItem
              imagePath="src/assets/images/list_box.png"
              element={<Goals />}
              active={checkItem(4)}
              click={() => handleItemClick(4)}
            />
            <FilterBarItem
              imagePath="src/assets/images/quoteIcon.png"
              element={<Quote />}
              active={checkItem(5)}
              click={() => handleItemClick(5)}
            />
            <FilterBarItem
              imagePath="src/assets/images/fullscreenIcon.png"
              active={false}
              click={toggleFullscreen}
            />
          </>
        )}
      </div>
    </>
  )
}
