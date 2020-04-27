import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {

    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService,
        }
      ],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);

    //// можем получить любой сервис
    // let msgSvc = TestBed.get(MessageService);
  });

  describe('getHero', () => {

    it('should call get with the correct URL', () => {

      // подписываемся на сервис
      service.getHero(4).subscribe(
        res => {
          console.log('getHero work: ', res);
        }
      );

      // expectOne - ожидает ответа
      const req = httpTestingController.expectOne('api/heroes/4');

      // как бы возвращаем с бека
      req.flush({ id: 4, name: 'Spider-Man', strength: 100 });

      /*
      *  У экземпляра класса HttpTestingController нужно вызывать метод verify(),
      *  который подтверждает, что все запросы в рамках текущего теста были выполнены.
      *  Код идеально подходит для размещения в функции afterEach().
      * */
      httpTestingController.verify();

    });

  });

});
