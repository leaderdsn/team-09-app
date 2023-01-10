import React, { useState, useEffect } from 'react';

export const useAudio = (url: string, loop = false) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  audio.loop = loop;
  audio.volume = 0.3;
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};
