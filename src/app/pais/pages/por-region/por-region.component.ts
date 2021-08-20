import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
    }
    `
  ]
})
export class PorRegionComponent {

  termino = '';
  error: boolean =  false;
  paises: Country[] = [];
  
  constructor( private paisService: PaisService) { }
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  tipo = 'region';

  getClass( region: string ){
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

  activarRegion( region: string ){

    if(region === this.regionActiva ){
      return
    }
    this.error = false;
    this.termino = region;
    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarPais( this.termino, this.tipo ).subscribe( paises => {
      this.paises = paises;
    },
      (err) => {
        this.error = true;
        this.paises = [];
      }
    )
  }

}
