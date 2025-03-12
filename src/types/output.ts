type IUser = {
  _id: string;
  roles: IRole[];
  nom: string;
  prenom: string;
  email: string;
};

type IRole = {
  _id: string;
  nom: string;
  description?: string;
};

export type { IUser };
