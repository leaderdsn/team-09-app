export interface Topics {
  questions?: Question[];
  answers?: TopicsAnswer[];
}

export interface TopicsAnswer {
  id?: string;
  answer: Answer[];
}

export interface Answer {
  id?: string;
  owner: Owner;
  creation_date: Date;
  score: number;
  text: string;
}

export interface User {
  user_id: string;
  user_type: UserType;
  profile_image: string;
  display_name: string;
}
export interface Owner {
  account_id: string;
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
  id: string;
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

export interface IPropsAnswers {
  answers: Answer[];
  questionId?: string
  updateState: (id: string) => void;
}

export interface IPropsAnswer {
  answer: Answer;
}

export interface IPropsQuestion {
  questions: Question[];
  chooseTopic: (id: string) => void;
  updateState: () => void;
}

export interface IPropsQuestionItem {
  item: Question;
  chooseTopic: (id: string) => void;
}