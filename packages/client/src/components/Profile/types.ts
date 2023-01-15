export type Inputs = {
  nickName: string;
  email: string;
  userName: string;
  newPassword: string;
  confirmPassword: string;
};

export type AudioPlayerProps = {
  playing: boolean;
  toggle: () => void;
};
