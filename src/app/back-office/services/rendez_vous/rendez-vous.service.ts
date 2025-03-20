import { IRendez_vous } from '@/types/output';
import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RendezVousService {
  constructor() {}

  async getAll(): Promise<IRendez_vous[]> {
    try {
      const response: AxiosResponse<IRendez_vous[]> = await axios.get(
        `${environment.apiUrl}/rdv`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getAllStatus(status: string): Promise<IRendez_vous[]> {
    try {
      const response: AxiosResponse<IRendez_vous[]> = await axios.get(
        `${environment.apiUrl}/rdv/status/${status}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async findById(_id: string): Promise<IRendez_vous> {
    try {
      const response: AxiosResponse<IRendez_vous> = await axios.get(
        `${environment.apiUrl}/rdv/${_id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
