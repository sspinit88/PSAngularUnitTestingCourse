import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (deep tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

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
        HeroComponent,
      ],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);

    mockHeroService.getHeroes.and.returnValue(of(HEROES));

  });

  it('should render each hero as a HeroComponent', () => {

    // run ngOnInit()
    fixture.detectChanges();

    const deHeroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

    HEROES.forEach((item, i) => {
      const itemHeroName = deHeroComponent[i].componentInstance.hero.name;
      expect(itemHeroName).toBe(HEROES[i].name, 'Имя не совпадает!');
    });

    expect(deHeroComponent.length).toEqual(3);

  });

  it('should call heroService.deleteHero when the HeroComponent\'s  delete button is clicked',
    () => {

      // имитируем метод 'delete'
      spyOn(fixture.componentInstance, 'delete');

      mockHeroService.getHeroes.and.returnValue(of(HEROES));

      // run ngOnInit()
      fixture.detectChanges();

      // получаем все имеющиеся HeroComponent (<app-hero>)
      const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

      // имитируем событие клика по первому элементу, ведущее к удалению этого элемента
      // heroComponents[0].query(By.css('.delete'))
      //   .triggerEventHandler('click', {
      //     stopPropagation: () => {
      //     }
      //   });

      // имитируем событие клика по первому элементу, ведущее к удалению этого элемента
      (heroComponents[0].componentInstance as HeroComponent).delete.emit(undefined);

      // имитируем событие клика по первому элементу, ведущее к удалению этого элемента
      // heroComponents[0].triggerEventHandler('delete', null);

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    });

  it('should add a new hero to the hero list when the add button is clicked', () => {

    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit()
    fixture.detectChanges();

    const newHero = {
      id: 5,
      name: 'Mr. Ice',
      strength: 25,
    };

    mockHeroService.addHero.and.returnValue(of(newHero));

    // получаем инпут
    const inputElement = fixture.debugElement
      .query(By.css('input'))
      .nativeElement;

    // получаем кнопку добавления
    const addButton = fixture
      .debugElement
      .queryAll(By.css('button'))[0];

    // имитируем ввод имени нового героя
    inputElement.value = newHero.name;

    // имитируем клик по кнопке добавления
    addButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

    expect(heroText).toContain(newHero.name);

  });

});
