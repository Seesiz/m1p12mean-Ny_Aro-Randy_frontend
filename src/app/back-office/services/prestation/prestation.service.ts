import { Injectable } from '@angular/core';
import { IPrestation } from '@/types/output';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PrestationService {
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

  async getAllPrestations(): Promise<IPrestation[]> {
    try {
      const response: AxiosResponse<IPrestation[]> = await this.axios.get('/services');
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async savePrestation(prestation: IPrestation): Promise<IPrestation> {
    try {
      const response: AxiosResponse<IPrestation> = await this.axios.post('/services', prestation);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async updatePrestation(prestation: IPrestation): Promise<IPrestation> {
    try {
      const response: AxiosResponse<IPrestation> = await this.axios.put(`/services/${prestation._id}`, prestation);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async getPrestation(_id: string): Promise<IPrestation> {
    try {
      const response: AxiosResponse<IPrestation> = await this.axios.get(`/services/${_id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async deletePrestation(_id: string): Promise<IPrestation> {
    try {
      const response: AxiosResponse<IPrestation> = await this.axios.delete(`/services/${_id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
