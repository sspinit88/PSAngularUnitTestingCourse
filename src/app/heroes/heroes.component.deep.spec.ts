import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroesComponent (deep tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroesArray;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'deleteHero'
    ]);

    heroesArray = [
      { id: 1, name: 'Super 1', strength: 8 },
      { id: 2, name: 'Super 2', strength: 9 },
      { id: 3, name: 'Super 3', strength: 10 },
    ];

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should call HeroService.deleteHero when the HeroComponent\'s delete btn is clicked',
    () => {
      spyOn(fixture.componentInstance, 'delete');

      mockHeroService.getHeroes.and.returnValue(of(heroesArray));

      fixture.detectChanges();

      const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
      // heroComponents[0]
      //   .query(By.css('button'))
      //   .triggerEventHandler('click', {
      //     stopPropagation: () => {
      //     }
      //   });

      (heroComponents[0].componentInstance as HeroComponent).delete.emit(undefined);

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroesArray[0]);
    });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroesArray));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroesArray.forEach((item, i) => {
      const itemHeroName = heroComponents[i].componentInstance.hero.name;
      expect(itemHeroName).toBe(heroesArray[i].name, 'Имя не совпадает!');
    });

    expect(heroComponents.length).toEqual(3);

  });

});
