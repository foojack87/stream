import { useRef } from 'react';

import Nav from '../components/Nav'
import VideoJS from '../components/VideoJS'

const FormulaOne = props => {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: import.meta.env.VITE_PROJECT_ID,
      type: 'rtmp/flv'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  return   (
    <>
  <Nav />
  <main>
  <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
  </main>
    </>
    )
}
export default FormulaOne