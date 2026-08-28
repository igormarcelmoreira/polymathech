import Audio from '@/components/Audio/Audio'
import YoutubeBackground from '@/components/YoutubeBackground/YoutubeBackground'
import React, { useEffect, useState } from 'react'
import { YouTubePlayer } from 'react-youtube'
import styles from './AudioList.style.module.css'



type AudioListProps = {
  hidden: boolean
}

function AudioList({ hidden }: AudioListProps) {
  const lofi = 'https://www.youtube.com/watch?v=W41eBhJD32c&autoplay=1'
  const chuva = 'https://www.youtube.com/watch?v=i6FEkERgS-M&autoplay=1'
  const natureza = 'https://www.youtube.com/watch?v=wS9GcsrigDw&autoplay=1'
  const oceano = 'https://www.youtube.com/watch?v=N3zSULG00F8&autoplay=1'
  const binauralMusic = 'https://www.youtube.com/watch?v=q06RzYq_9No&autoplay=1'
  const binaural7Hz = 'https://www.youtube.com/watch?v=-AfuOtlMcII&autoplay=1'
  const biblioteca = 'https://www.youtube.com/watch?v=E3_eIwDWS_c&autoplay=1'
  const piano = 'https://www.youtube.com/watch?v=LWMt9nrlIEs&autoplay=1'
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(
    localStorage.getItem('videoUrl') || null,
  )
  const [volume, setVolume] = useState<number>(0)
  const [muted, setMuted] = useState<boolean>(false)
  const [videoTitle, setVideoTitle] = useState<string>("")
  const [seed, setSeed] = useState(1);
  const [seed2, setSeed2] = useState(2);
       const playerResetar = () => {
            setSeed(Math.random());
            setSeed2(Math.random());
        }

 
  useEffect( () => {
    localStorage.setItem('videoUrl', videoUrl || '')
    setVolume(0);
    playerResetar;
  }, [videoUrl])

  const onReadyBackground = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target)
    event.target.setVolume(volume)
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value)
    if (player) {
      if (newVolume == 0) player.mute()
      else {
        if (!muted) player.unMute()
        player.setVolume(newVolume)
      }
    }
    setVolume(newVolume)
  }

  const mute = () => {
    if (player) {
      if (muted) {
        console.log(player.getVolume())
        if (volume != 0) player.unMute()
        setMuted(false)
      } else {
        player.mute()
        setMuted(true)
      }
    }
  }

  return (
    <>
      {videoUrl !== null && videoUrl !== '' && (
        <YoutubeBackground
          key={seed}
          novid={false}
          videoUrl={videoUrl}
          onReady={onReadyBackground}
          title={videoTitle}
        />
      )}
      <section
        className={`${styles.container} ${hidden ? styles.hidden : ''}`}
        id="audioListSpan"
      >
        <div className={styles.container__internal}>
          <h2 className={styles.internal__title}>
            <img src="src/assets/images/Music.png" alt="" />
            Som de Fundo
          </h2>
          <div className={styles.internal__buttons}>
            <input
              className={styles.buttons__checkbox}
              type="checkbox"
              onClick={mute}
              id="main_checkbox"
            />
            <label
              className={styles.buttons__muteIcon}
              htmlFor="main_checkbox"
            />
            <input
              className={volume == 0 ? styles.buttons__volumeBar0 : styles.buttons__volumeBar}
              type="range"
              min="0"
              max="100"
              step="1"
              key={seed2}
              onMouseMove={(event) => {
                const x = event.target.value
                const color = `linear-gradient(90deg, rgba(255, 255, 255, 1) ${x}%, rgba(255, 255, 255, 60%) ${x}%)`
                event.target.style.background = color
              }}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <h2 className={styles.internal__title}>Youtube Video</h2>
          <input
            className={styles.internal__input}
            type="text"
            placeholder="Insira o link do Youtube"
            value={videoUrl || ''}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <ul className={styles.internal__list}>
            <li className={styles.list__sound}>
              <label className={styles.sound__title}>Lofi</label>
              <Audio id="lofi_audio" url={lofi} novid={true} />
            </li>
            <li className={styles.list__sound}>
              <label className={styles.sound__title}>Oceano</label>
              <Audio id="oceano_audio" url={oceano} novid={true} />
            </li>
            <li className={styles.list__sound}>
              <label className={styles.sound__title}>Natureza</label>
              <Audio id="natureza_audio" url={natureza} novid={true} />
            </li>
            <li className={styles.list__sound}>
              <label className={styles.sound__title}>Chuva</label>
              <Audio id="chuva_audio" url={chuva} novid={true} />
            </li>
            <li className={styles.list__sound}>
              <label className={styles.sound__title}>Musica binaural</label>
              <Audio id="binaural_audio" url={binauralMusic} novid={true} />
            </li>
            <li className={styles.list__sound}>
              <label className={styles.sound__title}>Frequência binaural</label>
              <Audio id="binaural_frequencia" url={binaural7Hz} novid={true} />
            </li>
            <li className={styles.list__sound}>
              <label className={styles.sound__title}>Biblioteca</label>
              <Audio id="biblioteca_audio" url={biblioteca} novid={true} />
            </li>
            <li className={styles.list__sound}>
              <label className={styles.sound__title}>Piano</label>
              <Audio id="piano_audio" url={piano} novid={true} />
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default AudioList
