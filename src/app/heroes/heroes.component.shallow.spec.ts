import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';


@Component({
  selector: 'app-hero',
  template: '<div></div>',
})
class FakeHeroComponent {
  @Input() hero: Hero;
  // @Output() delete = new EventEmitter();
}

describe('HeroesComponent (shallow tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let componentInstance;
  let mockHeroService;
  let heroesArray;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    heroesArray = [
      { id: 1, name: 'Super 1', strength: 8 },
      { id: 2, name: 'Super 2', strength: 9 },
      { id: 3, name: 'Super 3', strength: 10 },
    ];

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent,
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    componentInstance = fixture.componentInstance;
  });

  it('should set correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroesArray));
    fixture.detectChanges();
    expect(componentInstance.heroes.length).toBe(heroesArray.length);
  });

  it('should create one li for each hero', function () {
    mockHeroService.getHeroes.and.returnValue(of(heroesArray));
    fixture.detectChanges();

    const liLength = fixture.debugElement.queryAll(By.css('li')).length;

    expect(liLength).toBe(heroesArray.length);
  });

});
