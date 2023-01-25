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

export interface User {
  user_id: number;
  user_type: UserType;
  profile_image: string;
  display_name: string;
}
export interface Owner {
  account_id: number;
  reputation: number;
  user: User,
  link: string;
  accept_rate?: number;
}

export enum UserType {
  Registered = 'registered',
  Unregistered = 'unregistered',
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
  creation_date: Date;
  last_edit_date?: number;
  link: string;
  title: string;
}

export interface IPropsAnswer {
  answers: Answer[];
}

export interface IPropsQuestion {
  questions: Question[];
  chooseTopic: (id: number) => void;
  updateState: () => void;
}

export interface IPropsQuestionItem {
  item: Question;
  chooseTopic: (id: number) => void;
}