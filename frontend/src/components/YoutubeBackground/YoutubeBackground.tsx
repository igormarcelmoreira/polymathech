import YouTube from 'react-youtube'
import { NowPlayingSidebar } from './NowPlayingSidebar/NowPlayingSidebar'
import styles from './YoutubeBackground.module.css'

type VideoPlayerProps = {
  videoUrl: string
  onReady: () => void
  novid?: boolean
  title?: string
}

function VideoPlayer({ videoUrl, onReady, novid = true , title = ""}: VideoPlayerProps) {
  const videoId = videoUrl
    .replace('https://www.youtube.com/watch?v=', '')
    .split('&')[0]

  let opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      loop: 1,
      mute: 1
    },
  }
  return (
    <>
      {novid === false && (
        <>
        <YouTube
          className={styles.video}
          iframeClassName={styles.iframe}
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={(e) => {e.data === YouTube.PlayerState.ENDED ? e.target.playVideo():{} }}
        />
        <NowPlayingSidebar videoId={videoId} />
        </>
      )}
      {novid === true && (
        <YouTube
          className={styles.novid}
          iframeClassName={styles.novid}
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={(e) => {e.data === YouTube.PlayerState.ENDED ? e.target.playVideo():{} }}
        />
      )}
    </>
  )
}

export default VideoPlayer
