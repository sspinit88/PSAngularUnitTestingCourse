import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';


describe('HeroesComponent (shallow)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  // создаем фейковый дочерний компонент
  @Component({
    selector: 'app-hero',
    template: '<div></div>>',
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Spider-Man', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'Super-Man', strength: 58 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero'
    ]);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent,
      ],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        }
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should create one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const deLi = fixture.debugElement.queryAll(By.css('li'));
    expect(deLi.length).toBe(3);
  });


});
