export type TErrors = {
  value?: string;
  msg: string;
  param: string;
  location?: string;
};

export type TUsers = {
  id: number;
  email: string;
  count_login: number;
  time_logout: string;
  createdAt: string;
};

export type TListOfName = {
  id: number;
  name: string;
};
