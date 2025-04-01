import { Injectable } from '@angular/core';
import { IMission } from '@/types/output';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor() {}

  async getAll(): Promise<IMission[]> {
    try {
      const response: AxiosResponse<IMission[]> = await axios.get(
        `${environment.apiUrl}/missions`
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
      const response: AxiosResponse<IMission> = await axios.get(
        `${environment.apiUrl}/missions/${id}`
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
      const response: AxiosResponse<IMission> = await axios.post(
        `${environment.apiUrl}/missions`,
        mission
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
