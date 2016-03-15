import {Component, OnInit} from 'angular2/core';

import {Router} from 'angular2/router';

import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

@Component({
	selector: 'my-heroes',
	template: `
		<h1>{{title}}</h1>
		<h2>My Heroes</h2>
		<ul class="heroes">
		  <li *ngFor="#hero of heroes"
			  [class.selected]="hero === selectedHero"
			  (click)="onSelect(hero)">
			<span class="badge">{{hero.id}}</span> {{hero.name}}
		  </li>
		</ul>
		<div *ngIf="selectedHero">
		  <h2>
			{{selectedHero.name | uppercase}} is my hero
		  </h2>
		  <button (click)="gotoDetail()">View Details</button>
		</div>
    `,
	styleUrls: ['app/app.component.css'],
	directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
	public title = 'Tour of Heroes';
	public heroes:Hero[];
	public selectedHero:Hero;

	constructor(private _heroService:HeroService,
				private _router:Router) {
	}

	onSelect(hero:Hero) {
		this.selectedHero = hero;
	}

	getHeroes() {
		this._heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	ngOnInit() {
		this.getHeroes();
	}

	gotoDetail(hero:Hero) {
		this._router.navigate(['HeroDetail', {id: this.selectedHero.id}]);
	}
}
