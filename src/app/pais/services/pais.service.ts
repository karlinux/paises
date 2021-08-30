import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../pages/interfaces/pais.interface';
import { PaisSmall } from '../pages/interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private _regiones: string[] = ["Africa", "Americas","Asia", "Europe", "Oceania"];
  
  get regiones(){
    return [ ...this._regiones ];
  }

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
  getPaisesPorRegion( region: string ): Observable<PaisSmall[]>{
    
    const params = new HttpParams().set(
      'fields', 'name;alpha3Code'
     )
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<PaisSmall[]>(url, { params });
  }

  //Ver País
  getPaisForCode( id: string ): Observable<Country | null>{

    if(!id){
      return of( null )
    }
    
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }

  //Ver País
  getPaisForCodeSmall( id: string ): Observable<PaisSmall>{
    const url = `${this.apiUrl}/alpha/${id}?fields=alpha3Code;name`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos( border: string[] ): Observable<PaisSmall[]> {

    if(!border){
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    border.forEach( codigo => {
      const peticion = this.getPaisForCodeSmall(codigo);
      peticiones.push( peticion );
    })

    return combineLatest( peticiones );
  }
}
