import { useEffect, useRef, useState } from 'react'
import editIcon from 'src/assets/images/editIcon.png'
import pauseIcon from 'src/assets/images/pauseIcon.png'
import playIcon from 'src/assets/images/playIcon.png'
import stopIcon from 'src/assets/images/stopIcon.png'
import styles from './Pomodoro.style.module.css'

type PomodoroProps = {
  hidden: boolean
}
function Pomodoro({ hidden }: PomodoroProps) {
  const [initialTime, setInitialTime] = useState(() => {
    const savedInitialTime = localStorage.getItem('pomodoroInitialTime')
    return savedInitialTime ? parseInt(savedInitialTime, 10) : 3000 // 50 minutes in seconds
  })
  const savedTime = localStorage.getItem('pomodoroTime')
  const savedTimestamp = localStorage.getItem('pomodoroTimestamp')
  const savedIsRunning = localStorage.getItem('pomodoroIsRunning') === 'true'
  const savedIsOnBreak = localStorage.getItem('pomodoroIsOnBreak') === 'true'

  const calculateTimeLeft = () => {
    if (!savedTime || !savedTimestamp || !savedIsRunning) {
      return savedTime ? parseInt(savedTime, 10) : initialTime
    }
    const elapsed = Math.floor(
      (Date.now() - parseInt(savedTimestamp, 10)) / 1000,
    )
    return Math.max(parseInt(savedTime, 10) - elapsed, 0)
  }

  const [time, setTime] = useState(calculateTimeLeft)
  const [isRunning, setIsRunning] = useState(savedIsRunning)
  const [isEditing, setIsEditing] = useState(false)
  const [isOnBreak, setIsOnBreak] = useState(savedIsOnBreak)
  const [newInitialTime, setNewInitialTime] = useState(initialTime / 60)
  const intervalId = useRef(null)

  useEffect(() => {
    localStorage.setItem('pomodoroTime', time)

    if (isRunning) {
      if (time == 0)
      {
        if (!isOnBreak)
        {
          setIsOnBreak(true);
          localStorage.setItem('pomodoroIsOnBreak', 'true')
          notify("Acabou o tempo! Descanse por 10 min.")
          setTime(600)
          localStorage.removeItem('pomodoroTime')
          localStorage.removeItem('pomodoroTimestamp')
        }
        else
        {
          notify("Acabou o descanso! Volte a trabalhar.")
          handleReset();
        }
      }
    }
  }, [time])

  useEffect(() => {
    localStorage.setItem('pomodoroIsRunning', isRunning)
    if (isRunning) {
      localStorage.setItem('pomodoroTimestamp', Date.now())
      intervalId.current = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
      }, 1000)
    } else if (!isRunning && intervalId.current) {
      clearInterval(intervalId.current)
      intervalId.current = null
    }

    return () => clearInterval(intervalId.current)
  }, [isRunning])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTime(initialTime)
    localStorage.removeItem('pomodoroTime')
    localStorage.removeItem('pomodoroTimestamp')
    setIsOnBreak(false);
    localStorage.setItem('pomodoroIsRunning', 'false')
    localStorage.setItem('pomodoroIsOnBreak', 'false')
  }

  const handleTimeChange = (a) => {

    if (a.target.valueAsNumber < 1)
    setNewInitialTime(1)
    else
    setNewInitialTime(a.target.valueAsNumber)
  }

  var opcoes = {
    icon: "src/assets/images/Logo.png",
  };

  const notify = (message) => {
    if (Notification.permission === 'granted') {
      new Notification(message, opcoes)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(message, opcoes)
        }
      })
    }
  }
  const handleSaveInitialTime = () => {
    const newTimeInSeconds = parseInt(newInitialTime, 10) * 60 // convert minutes to seconds
    localStorage.setItem('pomodoroInitialTime', newTimeInSeconds)
    setTime(newTimeInSeconds)
    setInitialTime(newTimeInSeconds)
    setIsEditing(false)
    setIsOnBreak(false);
    setIsRunning(false)
    localStorage.removeItem('pomodoroTime')
    localStorage.removeItem('pomodoroTimestamp')
    localStorage.setItem('pomodoroIsRunning', 'false')
    localStorage.setItem('pomodoroIsOnBreak', 'false')
  }

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <div className={`${styles.container} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.container__internal}>
        <div className={styles.internal__title}>
          <img src="src/assets/images/TimerIcon.png" alt="Timer Icon" />
          <span>Temporizador</span>
        </div>
        {isEditing ? (
          <div className={styles.editContainer}>
            <span className={styles.editTitle}> Edite o tempo inicial </span>
            <input
              type="number"
              value={newInitialTime}
              onChange={(e) => handleTimeChange(e)}
              className={styles.editInput}
            />
            Min
            
            <button
              onClick={handleSaveInitialTime}
              className={styles.saveButton}
            >
              Salvar
            </button>
          </div>
        ) : (
          <img
            src={editIcon}
            alt="Edit"
            onClick={() => setIsEditing(true)}
            className={styles.editIcon}
          />
        )}
        <div className={isOnBreak ? styles.timerDisplayOnBreak : styles.timerDisplay}>{formatTime(time)}</div>
        <div className={styles.timerControls}>
          <img
            src={playIcon}
            alt="Start"
            onClick={handleStart}
            className={`${styles.buttonIcon} ${isRunning ? styles.disabled : ''}`}
          />
          <img
            src={pauseIcon}
            alt="Pause"
            onClick={handlePause}
            className={`${styles.buttonIcon} ${!isRunning ? styles.disabled : ''}`}
          />
          <img
            src={stopIcon}
            alt="Stop"
            onClick={handleReset}
            className={styles.buttonIcon}
          />
        </div>
        
      </div>
    </div>
  )
}

export default Pomodoro
