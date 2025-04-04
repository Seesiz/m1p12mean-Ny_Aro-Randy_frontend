import { environment } from '@/environments/environments';
import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { IUser } from '@/types/output';

interface LoginResponse {
  user: IUser;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  async login(
    email: string,
    pass: string,
    role: string
  ): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.axios.post(
        `/auth/login`,
        {
          email,
          pass,
          role,
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getUserConnected(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as IUser) : null;
  }

  async getConnectedByToken(token: string) {
    try {
      const response: AxiosResponse<IUser> = await this.axios.get(`/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
