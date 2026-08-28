import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './NowPlayingSidebar.module.css';

type NowPlayingSidebarProps = {
  videoId: string;
};

export function NowPlayingSidebar({ videoId }: NowPlayingSidebarProps) {
  const [title, setTitle] = useState<string>("");

  interface VideoResponse {
    items: Array<{
      snippet: {
        title: string;
      };
    }>;
  }

  const fetchVideoTitle = async (id: string) => {
    try {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const response = await axios.get<VideoResponse>('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+ id + '&key=' + apiKey);
      const videoTitle = response.data.items[0].snippet.title;
      setTitle(videoTitle);
    } catch (error) {
      console.error('Error fetching the video title:', error);
    }
  };

  useEffect(() => {
    if (videoId != null)
    fetchVideoTitle(videoId);
  }, [videoId]);

  return (
    <div className={styles.container}>
      <h4 className={styles.playingText}>Tocando - </h4> <span className={styles.titlePlaying}>{title}</span>
      <img src="src/assets/images/max_volume.svg" alt="Max Volume Icon" />
    </div>
  );
}
