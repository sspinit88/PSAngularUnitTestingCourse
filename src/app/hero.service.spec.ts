import { inject, TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add', 'clear']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  it('should cal get with the correct URL', () => {
    service
      .getHero(4)
      .subscribe(
        res => {
          console.log('getHero() - work:', res);
        }
      );

    const req = httpTestingController.expectOne('api/heroes/4');

    req.flush({ id: 4, name: 'SuperDude', strength: 100 });
    httpTestingController.verify();
  });
});
