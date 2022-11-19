export interface IUser {
  user: IUserData;
}
export interface IUserData {
  name?: string;
  age?: number;
  count?: number;
}

export interface IServerResponse {
  age: number;
  name: string;
  count: number;
}
