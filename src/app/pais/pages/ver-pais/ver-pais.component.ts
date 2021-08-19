import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: []
})
export class VerPaisComponent implements OnInit {

  error: boolean =  false;
  pais!: Country;

  constructor( private activateRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit() {

    this.activateRoute.params
    .pipe(
      switchMap( ({ id }) => this.paisService.getPaisForCode( id ) ),
      tap( console.log )
    )
    .subscribe( pais => this.pais = pais)

    // this.activateRoute.params.subscribe( ({ id }) => {
    //   console.log( id );
    // this.paisService.getPaisForCode( id ).subscribe( pais => {
    //     console.log(pais)
    //     this.pais = pais;
    //   },
    //     (err) => {
    //       this.error = true;
    //     }
    //   )
    // })
  }

}
