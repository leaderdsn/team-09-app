import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb';
import { AudioPlayerProps } from '@/components/Profile/types';
import { MouseEventHandler } from 'react';
export const AudioPlayer = ({ playing, toggle }: AudioPlayerProps) => {
  return (
    <div className="cursor-pointer p-5" onClick={toggle as MouseEventHandler<HTMLDivElement>}>
      {playing ? <TbHeadphonesOff /> : <TbHeadphones />}
    </div>
  );
};
