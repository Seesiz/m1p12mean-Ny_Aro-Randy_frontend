import { Injectable } from '@angular/core';
import { IPack } from '@/types/output';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  constructor() {}

  async getAll(): Promise<IPack[]> {
    try {
      const response: AxiosResponse<IPack[]> = await axios.get(
        `${environment.apiUrl}/packs`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${environment.apiUrl}/packs/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
