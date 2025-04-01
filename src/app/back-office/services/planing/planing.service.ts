import { Injectable } from '@angular/core';
import { IPlaning } from '@/types/output';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PlaningService {
  constructor() {}

  async save(planing: Omit<IPlaning, '_id'>): Promise<IPlaning> {
    try {
      const response: AxiosResponse<IPlaning> = await axios.post(
        `${environment.apiUrl}/planings`,
        planing
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getAll(): Promise<IPlaning[]> {
    try {
      const response: AxiosResponse<IPlaning[]> = await axios.get(
        `${environment.apiUrl}/planings`
      );
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
      const response: AxiosResponse<IPlaning> = await axios.put(
        `${environment.apiUrl}/planings/${id}`,
        planing
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
