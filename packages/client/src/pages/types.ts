import { EmptyValue } from "@/types/types";

export interface ProfileData {
  avatar: EmptyValue<string>;
  nickName: EmptyValue<string>;
  email: EmptyValue<string>;
  userName: EmptyValue<string>;
  password: EmptyValue<string>;
}

export interface ProfileProps {
  data: ProfileData;
  formDataChange?: (formData: ProfileData) => void;
}

export type LeaderInfo = {
  data: {
    id: number;
    name: string;
    avatar: string;
    result: number;
    aux: number;
  }
};