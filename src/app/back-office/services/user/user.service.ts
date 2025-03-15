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

  async getAllUsers(): Promise<IUser[]> {
    try {
      const response: AxiosResponse<IUser[]> = await axios.get(
        `${environment.apiUrl}/users`
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
    pass: string
  ): Promise<UserResponse> {
    try {
      const response: AxiosResponse<UserResponse> = await axios.post(
        `${environment.apiUrl}/users`,
        {
          lastname,
          firstname,
          email,
          pass,
          roles: ['67ce96d2dd77ba0a7c340eb4'],
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
