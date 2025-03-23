import { Injectable } from '@angular/core';
import { IPrestation } from '@/types/output';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PrestationService {
  constructor() {}

  async getAllPrestations(): Promise<IPrestation[]> {
    try {
      const response: AxiosResponse<IPrestation[]> = await axios.get(
        `${environment.apiUrl}/services`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async savePrestation(prestation: IPrestation): Promise<IPrestation> {
    try {
      const response: AxiosResponse<IPrestation> = await axios.post(
        `${environment.apiUrl}/services`,
        prestation
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
