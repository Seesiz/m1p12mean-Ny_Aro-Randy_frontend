import { Injectable } from '@angular/core';
import { IPack } from '@/types/output';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PackService {
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

  async savePack(pack: IPack): Promise<IPack> {
    try {
      const response: AxiosResponse<IPack> = await this.axios.post('/packs', pack);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getAll(): Promise<IPack[]> {
    try {
      const response: AxiosResponse<IPack[]> = await this.axios.get('/packs');
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.axios.delete(`/packs/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async updatePack(
    id: string,
    label: string,
    price: number,
    prestations: string[],
    remise: number
  ): Promise<IPack> {
    try {
      const data = {
        label,
        price,
        services: prestations,
        remise: remise,
      };

      const response: AxiosResponse<IPack> = await this.axios.put(`/packs/${id}`, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
