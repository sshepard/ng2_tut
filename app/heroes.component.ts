import {Component} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import {OnInit} from 'angular2/core';

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
		<my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `,
	styleUrls: ['app/styles.css'],
	directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
	public title = 'Tour of Heroes';
	public heroes:Hero[];
	public selectedHero:Hero;

	constructor(private _heroService: HeroService) { }

	onSelect(hero:Hero) {
		this.selectedHero = hero;
	}

	getHeroes() {
		this._heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	ngOnInit() {
		this.getHeroes();
	}
}
