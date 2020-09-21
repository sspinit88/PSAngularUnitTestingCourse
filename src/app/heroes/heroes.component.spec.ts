import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let heroesArray = [];
  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'getHero',
      'deleteHero',
      'log',
    ]);

    heroesArray = [
      { id: 1, name: 'Super 1', strength: 8 },
      { id: 2, name: 'Super 1', strength: 8 },
      { id: 3, name: 'Super 1', strength: 8 },
    ];

    component = new HeroesComponent(mockHeroService);
    component.heroes = heroesArray;
  });

  it('should remove the indicated hero from the list', function () {
    mockHeroService.deleteHero.and.returnValue(of(true));

    component.delete(heroesArray[2]);

    expect(component.heroes.length).toBe(2);
  });

  it('should call deleteHero', function () {
    mockHeroService.deleteHero.and.returnValue(of(true));

    component.delete(heroesArray[2]);

    // TODO был ли вызван метод
    // expect(mockHeroService.deleteHero).toHaveBeenCalled();
    // TODO теперь точно уверены, что метод был вызван с верными параметрами
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroesArray[2]);
  });

});
