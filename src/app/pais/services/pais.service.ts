import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url = 'https://restcountries.eu/rest/v2';

  constructor() { }
}
