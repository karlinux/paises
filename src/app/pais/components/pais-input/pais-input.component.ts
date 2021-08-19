import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})

export class PaisInputComponent implements OnInit {
  
  @Input() placeHolder: string;
  @Output() onEnter: EventEmitter<String> = new EventEmitter();
  @Output() onDebounce: EventEmitter<String> = new EventEmitter();
  
  debouncer: Subject<String> = new Subject();

  termino: string = '';
  
  ngOnInit(): void {
    this.debouncer
    .pipe( debounceTime( 300 ) )
    .subscribe( valor => {
      this.onDebounce.emit( valor );
    });
  }


  teclaPresionada( ){
   this.debouncer.next( this.termino );
  }
  buscar(){
    this.onEnter.emit(this.termino);
  }
}
