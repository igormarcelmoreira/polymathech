import YoutubeBackground from '@/components/YoutubeBackground/YoutubeBackground'
import React, { useState } from 'react'
import styles from './Audio.style.module.css'

type YouTubePlayer = {
  getVolume: () => number
  setVolume: (volume: number) => void
  isMuted(): boolean
  mute: () => void
  unMute: () => void
}

type AudioProps = {
  id?: string
  url: string
  novid?: boolean
}

function Audio({ id, url, novid = true }: AudioProps) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [volume, setVolume] = useState<number>(0)
  const [muted, setMuted] = useState<boolean>(false)
  const [videoUrl, setVideoUrl] = useState('')

  const onReadyBackground = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target)
    event.target.setVolume(volume)
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value)
    if (player) {
      if (newVolume == 0 )
      player.mute()
      else{
      if(!muted)
      player.unMute()
      player.setVolume(newVolume)
      }
    }
    setVolume(newVolume)
  }

  const mute = () => {
    if (player) {
      if (muted) {
        console.log(player.getVolume())
        if(volume != 0)
        player.unMute()
        setMuted(false)
      } else {
        player.mute()
        setMuted(true)
      }
    }
  }


  return (
    <div className={styles.controllers}>
      <YoutubeBackground
        novid={novid}
        videoUrl={url}
        onReady={onReadyBackground}
      />
      <div className={styles.controllers__buttons}>
        <input
          className={styles.buttons__checkbox}
          type="checkbox"
          onClick={mute}
          id={id}
        />
        <label className={styles.buttons__muteIcon} htmlFor={id} />
        <input
          className={styles.buttons__volumeBar}
          type="range"
          min="0"
          max="100"
          step="1"
          onMouseMove={(event) => {
            const x = event.target.value
            const color = `linear-gradient(90deg, rgba(255, 255, 255, 1) ${x}%, rgba(255, 255, 255, 60%) ${x}%)`
            event.target.style.background = color
          }}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}
export default Audio
