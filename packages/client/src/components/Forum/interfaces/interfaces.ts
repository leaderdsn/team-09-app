export interface Topics {
  questions?: Question[];
  answers?: TopicsAnswer[];
}

export interface TopicsAnswer {
  id?: number;
  answer: Answer;
}

export interface Answer {
  id?: number;
  owner: Owner;
  creation_date: number;
  score: number;
  text: string;
}

export interface Owner {
  account_id: number;
  reputation: number;
  user_id: number;
  user_type: UserType;
  profile_image: string;
  display_name: string;
  link: string;
  accept_rate?: number;
}

export enum UserType {
  Registered = 'registered',
}

export interface Question {
  id: number;
  tags: string[];
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  accepted_answer_id?: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  last_edit_date?: number;
  link: string;
  title: string;
}
