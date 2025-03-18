import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IUser } from '@/types/output';
import { environment } from '@/environments/environments';

interface UserResponse {
  user: IUser;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async getUserById(id: string): Promise<IUser> {
    try {
      const response: AxiosResponse<IUser> = await axios.get(
        `${environment.apiUrl}/users/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getAllUsers(type: string): Promise<IUser[]> {
    try {
      const response: AxiosResponse<IUser[]> = await axios.get(
        `${environment.apiUrl}/users?role=${type}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async addUser(
    lastname: string,
    firstname: string,
    email: string,
    pass: string,
    roles: string[]
  ): Promise<UserResponse> {
    try {
      const response: AxiosResponse<UserResponse> = await axios.post(
        `${environment.apiUrl}/users`,
        {
          lastname,
          firstname,
          email,
          pass,
          roles,
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async updateUser(
    _id: string,
    lastname: string,
    firstname: string,
    email: string,
    pass: string,
    roles: string[]
  ): Promise<UserResponse> {
    try {
      const response: AxiosResponse<UserResponse> = await axios.put(
        `${environment.apiUrl}/users/${_id}`,
        {
          _id,
          lastname,
          firstname,
          email,
          pass,
          roles,
        }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
