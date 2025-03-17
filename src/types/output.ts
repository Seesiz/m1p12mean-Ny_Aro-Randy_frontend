type IUser = {
  _id: string;
  roles: IRole[];
  lastname: string;
  firstname: string;
  email: string;
  pass: string;
};

type IRole = {
  _id: string;
  name: string;
  description?: string;
};

export type { IUser, IRole };
