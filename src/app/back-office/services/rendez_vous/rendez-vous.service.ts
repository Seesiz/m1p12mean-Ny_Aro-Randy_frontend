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

  async getAllWithStatus(status: string): Promise<IRendez_vous[]> {
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

  async updateRendezVous(
    _id: string,
    rendez_vous: IRendez_vous
  ): Promise<IRendez_vous> {
    try {
      const response: AxiosResponse<IRendez_vous> = await axios.put(
        `${environment.apiUrl}/rdv/${_id}`,
        rendez_vous
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async add_rendez_vous_from_client(
    rendez_vous: Omit<IRendez_vous, '_id'| 'status'>
  ): Promise<IRendez_vous> {
    try {
      const response: AxiosResponse<IRendez_vous> = await axios.post(
        `${environment.apiUrl}/rdv`,
        rendez_vous,
        {
          headers: {
            'Content-Type': 'application/json',
          },
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
