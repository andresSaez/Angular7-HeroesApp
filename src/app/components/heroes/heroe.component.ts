import { Component, OnInit, ViewChild } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { format } from 'path';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo = false;
  id: string;

  // @ViewChild('forma') forma: NgForm;

  constructor(
    private _heroeService: HeroesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params.id;

    if (this.id !== 'nuevo') {
      this._heroeService.getHeroe( this.id )
        .subscribe( data => this.heroe = JSON.parse(data));
    }
   }

  ngOnInit() {
  }

  guardar() {
    console.log(this.id);
    if (this.id === 'nuevo') {
      console.log('insertando');
      // insertando
      this._heroeService.nuevoHeroe( this.heroe )
      .subscribe( data => {

        let parametro = <string> data['name'];

        this.router.navigate(['/heroe', parametro]);
      },
      error => console.log(error)
        );
    } else {
      this._heroeService.actualizarHeroe( this.heroe, this.id )
      .subscribe( data => {
        console.log(data);
        // this.router.navigate(['/heroe', data.name]);
      },
      error => console.log(error)
        );
    }
  }

  agregarNuevo( form: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);

    form.reset({
      casa: 'Marvel'
    });
  }

}
