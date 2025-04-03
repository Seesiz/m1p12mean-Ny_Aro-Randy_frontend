import { Injectable } from '@angular/core';
import { IMission } from '@/types/output';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
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

  async getAll() {
    try {
      const response: AxiosResponse<IMission[]> = await this.axios.get(
        '/missions'
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getAllPaginate(
    page?: number,
    search?: string,
    userId?: string
  ): Promise<{ data: IMission[]; page: number; totalPages: number }> {
    try {
      const response: AxiosResponse<{
        data: IMission[];
        page: number;
        totalPages: number;
      }> = await this.axios.get(
        `/missions?page=${page}&search=${search}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getMission(id: string): Promise<IMission> {
    try {
      const response: AxiosResponse<IMission> = await this.axios.get(
        `/missions/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async add(mission: Omit<IMission, '_id'>): Promise<IMission> {
    try {
      const response: AxiosResponse<IMission> = await this.axios.post(
        '/missions',
        mission
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async update(mission: IMission): Promise<IMission> {
    try {
      const response: AxiosResponse<IMission> = await this.axios.put(
        `/missions/${mission._id}`,
        mission
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getStatistiqueByYear(year: number): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.axios.get(
        `/missions/number/${year}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
