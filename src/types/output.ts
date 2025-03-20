type IUser = {
  _id: string;
  roles: IRole[];
  lastname: string;
  firstname: string;
  email: string;
  pass?: string;
};

type IRole = {
  _id: string;
  name: string;
  description?: string;
};

type IRendez_vous = {
  _id: string;
  status: string;
  date: Date;
  manager?: IUser;
  info: {
    email: string;
    fullname: string;
    contact: string;
  };
  duree?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type { IUser, IRole, IRendez_vous };
