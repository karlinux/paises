import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../pages/interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl = 'https://restcountries.eu/rest/v2';

  constructor( private http: HttpClient) { }
  
  buscarPais( termino: string, tipo: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/${tipo}/${termino}`;
    return this.http.get<Country[]>(url);
  }

  getPaisForCode( id: string ): Observable<Country>{
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }
  
  getPaisForRegion( id: string ): Observable<Country>{
    const url = `${this.apiUrl}/region/${id}`;
    return this.http.get<Country>(url);
  }

}
