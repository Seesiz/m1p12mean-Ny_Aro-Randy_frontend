import { IRole } from '@/types/output';
import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor() {}
  async getAll(): Promise<IRole[]> {
    try {
      const response: AxiosResponse<IRole[]> = await axios.get(
        `${environment.apiUrl}/roles`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
