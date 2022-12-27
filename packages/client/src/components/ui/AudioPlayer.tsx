import { useAudio } from '@/hooks/useAudio';
import { TbHeadphones, TbHeadphonesOff } from 'react-icons/all';
import { AudioPlayerProps } from '@/components/Profile/types';
import { MouseEventHandler } from 'react';
export const AudioPlayer = ({ url, loop }: AudioPlayerProps) => {
  const [playing, toggle] = useAudio(url, loop);

  return (
    <div className="cursor-pointer p-5" onClick={toggle as MouseEventHandler<HTMLDivElement>}>
      {playing ? <TbHeadphonesOff /> : <TbHeadphones />}
    </div>
  );
};
