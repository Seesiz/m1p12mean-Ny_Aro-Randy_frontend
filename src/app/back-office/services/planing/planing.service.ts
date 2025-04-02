import { Injectable } from '@angular/core';
import { IPlaning } from '@/types/output';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PlaningService {
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

  async save(planing: Omit<IPlaning, '_id'>): Promise<IPlaning> {
    try {
      const response: AxiosResponse<IPlaning> = await this.axios.post('/planings', planing);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getAll(): Promise<IPlaning[]> {
    try {
      const response: AxiosResponse<IPlaning[]> = await this.axios.get('/planings');
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async updatePlaning(
    id: string,
    planing: Omit<IPlaning, '_id'>
  ): Promise<IPlaning> {
    try {
      const response: AxiosResponse<IPlaning> = await this.axios.put(`/planings/${id}`, planing);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
