type IUser = {
  _id: string;
  roles: IRole[];
  lastname: string;
  firstname: string;
  email: string;
};

type IRole = {
  _id: string;
  nom: string;
  description?: string;
};

export type { IUser };
