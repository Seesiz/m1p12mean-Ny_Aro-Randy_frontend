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

type INote = {
  _id: string;
  fullName: string;
  description: string;
  src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  note: number;
};

type IPlaning = {
  _id: string;
  dateDebut: Date;
  duree: number;
  mecaniciens: IUser[];
  services: IPrestation[];
  mission: IMission;
};
export type {
  IUser,
  IRole,
  IRendez_vous,
  IPrestation,
  IPack,
  IMission,
  INote,
  IPlaning,
};
