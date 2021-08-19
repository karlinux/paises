import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: []
})
export class PorCapitalComponent {

  termino = '';
  error: boolean =  false;
  paises: Country[] = [];
  tipo: string = 'capital';
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
