import { IRendez_vous } from '@/types/output';
import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RendezVousService {
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

  async getAll(): Promise<IRendez_vous[]> {
    try {
      const response: AxiosResponse<IRendez_vous[]> = await this.axios.get(
        '/rdv'
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getAllWithStatus(
    status: 'confirmed' | 'pending' | 'cancelled'
  ): Promise<IRendez_vous[]> {
    try {
      const response: AxiosResponse<IRendez_vous[]> = await this.axios.get(
        `/rdv/status/${status}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getPaginate(
    status: 'confirmed' | 'pending' | 'cancelled',
    page?: number,
    search?: string
  ): Promise<{ data: IRendez_vous[]; page: number; totalPages: number }> {
    try {
      const response: AxiosResponse<{
        data: IRendez_vous[];
        page: number;
        totalPages: number;
      }> = await this.axios.get(
        `/rdv/status/${status}?page=${page || 1}&search=${search || ''}`
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
      const response: AxiosResponse<IRendez_vous> = await this.axios.get(
        `/rdv/${_id}`
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
      const response: AxiosResponse<IRendez_vous> = await this.axios.put(
        `/rdv/${_id}`,
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
    rendez_vous: Omit<IRendez_vous, '_id' | 'status'>
  ): Promise<IRendez_vous> {
    try {
      const response: AxiosResponse<IRendez_vous> = await this.axios.post(
        '/rdv',
        rendez_vous
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
