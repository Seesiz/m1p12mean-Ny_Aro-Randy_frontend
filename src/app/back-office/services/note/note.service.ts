import { Injectable } from '@angular/core';
import { INote } from '@/types/output';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from '@/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor() {}

  async getAll(): Promise<INote[]> {
    try {
      const response: AxiosResponse<INote[]> = await axios.get(
        `${environment.apiUrl}/notes`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }

  async add(note: INote): Promise<INote> {
    try {
      const response: AxiosResponse<INote> = await axios.post(
        `${environment.apiUrl}/notes`,
        note
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('Erreur de connexion:', err.message);
      throw new Error("Échec de l'authentification");
    }
  }
}
