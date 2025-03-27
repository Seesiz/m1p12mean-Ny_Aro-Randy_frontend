import { Injectable } from '@angular/core';
import { IPack } from '@/types/output';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  constructor() {}

  async savePack(pack: IPack): Promise<IPack> {
    try {
      const response: AxiosResponse<IPack> = await axios.post(
        `${environment.apiUrl}/packs`,
        pack
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

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

  async updatePack(
    id: string,
    label: string,
    price: number,
    prestations: string[]
  ): Promise<IPack> {
    try {
      const data = {
        label,
        price,
        services: prestations,
      };
      console.log(data);

      const response: AxiosResponse<IPack> = await axios.put(
        `${environment.apiUrl}/packs/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
