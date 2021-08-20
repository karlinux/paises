import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../pages/interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl = 'https://restcountries.eu/rest/v2';

  get httpParams (){
    return new HttpParams().set( 'fields', 'name;capital;alpha2Code;flag;population' );
  }
  constructor( private http: HttpClient){

  }
  
  buscarPais( termino: string, tipo: string ): Observable<Country[]>{
    
    const params = new HttpParams().set(
      'fields', 'name;capital;alpha2Code;flag;population'
     )
    const url = `${this.apiUrl}/${tipo}/${termino}`;
    return this.http.get<Country[]>(url, { params });
  }

  //Ver País
  getPaisForCode( id: string ): Observable<Country>{
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }
}
