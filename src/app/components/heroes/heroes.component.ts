import { Component, OnInit, NgZone } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from 'src/app/interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[];
  loading = true;
  constructor(
    private _heroesService: HeroesService,
    private ngZone: NgZone
  ) {
    this._heroesService.getHeroes()
      .subscribe( (data: any) => {
        this.heroes = JSON.parse(data);
         this.loading = false;
      });
  }

  ngOnInit() {
  }

  borraHeroe( key$: string) {

    this._heroesService.borrarHeroe(key$)
      .subscribe( data => {
        if (data === 'null') {
          console.log(this.heroes[key$]);
          this.ngZone.run(() => delete this.heroes[key$]);
        } else {
          console.error(data);
        }
      });
  }

}
