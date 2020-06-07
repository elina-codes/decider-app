export interface User {
  readonly id: string;
  first_name: string;
  last_name?: string;
  voted?: boolean;
}

export interface Option {
  readonly id: string;
  readonly author: string;
  content: string;
  vote_count: number;
  veto: boolean;
}

export interface Limits {
  vote_max: number;
  vote_min: number;
  veto_max: number;
  veto_min: number;
}

export interface Decision {
  readonly id: number;
  title: string;
  completed: boolean;
  members: User[];
  url: string;
  outcome?: string[];
  options?: Option[];
  limits: Limits;
}

export interface DecisionList {
  title: string;
  decisions: Decision[];
}

export type ReadonlyDecision = Readonly<Decision>;

export type CompletedDecision = Decision & { completed: true };

export const CompleteDecision = (decision: Decision): CompletedDecision => ({ ...decision, completed: true });
