import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: []
})



export class PorPaisComponent {
  
  termino = '';
  error: boolean =  false;
  paises: Country[] = [];
  tipo: string = 'name';

  constructor( private paisService: PaisService) { }

  buscar( termino: string ){
    this.error = false;
    this.termino = termino;
    this.paisService.buscarPais( this.termino, this.tipo ).subscribe( paises => {
      this.paises = paises;
    },
      (err) => {
        this.error = true;
        this.paises = [];
      }
    )
  }

  sugerencias( termino: string ){
    this.error = false;
  }
}

