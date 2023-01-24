import React, { useState, useEffect } from 'react';

export const useAudio = (url: string, loop = false) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  audio.loop = loop;
  audio.volume = 0.3;
  const toggle = () => {
    setPlaying(!playing);
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
      setPlaying(false);
      audio.pause();
    };
  }, []);

  return [playing, toggle];
};
