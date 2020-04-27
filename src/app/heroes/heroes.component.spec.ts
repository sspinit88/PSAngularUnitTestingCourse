import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';

describe('HeroComponent', () => {

  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Spider-Man', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'Super-Man', strength: 58 },
    ];

    // мокаем сервис
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);

  });

  describe('delete', () => {

    it('should remove the indicated hero from the heroes list', () => {
      // а тут иммитируем подписку
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.heroes = HEROES;

      component.delete(HEROES[2]);

      //// проверка на ожидаемый результат
      // expect(component.heroes.length).toBe(2);

      //// позволяет вызывать метод сервиса с передачей параметров
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });

  });


});
