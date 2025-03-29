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
    message: string;
  };
  duree?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type IPrestation = {
  _id: string;
  price: number;
  label: string;
  description: string;
  duree: number | 0;
  type: { status: number; reduction: 0; updatedAt?: Date };
};

type IPack = {
  _id: string;
  price: number;
  label: string;
  services: IPrestation[];
  remise: number;
};

type IMission = {
  _id: string;
  client: IUser;
  manager: IUser;
  services: (Omit<IPrestation, 'type'> & { status: string })[];
  dateDebut: Date;
  infoMission: {
    marque: string;
    model: string;
    serialNumber: string;
    description: string;
  };
};

export type { IUser, IRole, IRendez_vous, IPrestation, IPack, IMission };
