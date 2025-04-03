import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { IUser } from '@/types/output';
import { environment } from '@/environments/environments';

interface UserResponse {
  user: IUser;
}

interface PaginatedResponse {
  data: IUser[];
  page: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const response: AxiosResponse<IUser> = await this.axios.get(
        `/users/${id}`
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
      const response: AxiosResponse<IUser[]> = await this.axios.get(
        `/users?role=${type}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getAllUsersPaginate(
    type: string,
    page = 1,
    search = ''
  ): Promise<PaginatedResponse> {
    try {
      const response: AxiosResponse<PaginatedResponse> = await this.axios.get(
        `/users?role=${type}&page=${page}&search=${search}`
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
      const response: AxiosResponse<UserResponse> = await this.axios.post(
        '/users',
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
      const response: AxiosResponse<UserResponse> = await this.axios.put(
        `/users/${_id}`,
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
