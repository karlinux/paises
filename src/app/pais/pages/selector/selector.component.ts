import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../../services/pais.service';
import { PaisSmall } from '../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: []
})
export class SelectorComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region  : ['', Validators.required],
    pais    : ['', Validators.required],
    frontera : ['', Validators.required],
  })

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSmall[] = [];
  cargando: boolean =  false;

  constructor( private fb: FormBuilder, private paisService: PaisService ) { }

  ngOnInit() {
    this.regiones = this.paisService.regiones; 
    //Cuando cambia la región 
    // this.miFormulario.get('region').valueChanges.subscribe( region => {
    //   this.paisService.getPaisesPorRegion(region).subscribe( paises =>{
    //     this.paises = paises;
    //     console.log(paises)
    //   } )
    // })

    this.miFormulario.get('region').valueChanges.pipe(
      tap( (_) =>{
          this.miFormulario.get( 'pais' ).reset('');
          this.cargando = true;
      }),
      switchMap( region => this.paisService.getPaisesPorRegion(region) )
    ).subscribe( paises => {
      this.cargando = false;
      this.paises = paises;
    })

    this.miFormulario.get('pais').valueChanges.pipe(
      tap((_)=>{
        this.miFormulario.get( 'frontera' ).reset('');
        this.miFormulario.get( 'frontera' ).enable();
        this.cargando = true;
      }),
      switchMap( codigo => this.paisService.getPaisForCode( codigo ) ),
      switchMap( pais => this.paisService.getPaisesPorCodigos( (pais === null || pais === undefined) ? undefined : pais.borders ))
    ).subscribe( paises => {
      //let x = (pais === null || pais === undefined) ? undefined : this.fronteras = pais.borders;
      this.fronteras = paises;
      this.cargando = false;
    })

  }

  guardar(){
    console.log(this.miFormulario.value)
  }
}
