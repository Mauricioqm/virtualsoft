import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  baseURL: string = 'https://apidev.virtualsoft.tech/partner_api/Lobby/Api';

  constructor(private httpClient: HttpClient) { }

  obtenerPaises(): Observable<any> {
    return this.httpClient.get(this.baseURL);
  }
}
