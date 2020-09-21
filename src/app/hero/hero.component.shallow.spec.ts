import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow tests)', () => {

  let fixture: ComponentFixture<HeroComponent>;
  const heroOne = { id: 1, name: 'Super 1', strength: 8 };
  let componentInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroComponent,
      ],
      providers: [],
      // TODO schemas: [NO_ERRORS_SCHEMA] - игнорируем неизвестные атрибуты и т.п.
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
    componentInstance = fixture.componentInstance;
  });

  it('should have the correct hero', function () {
    componentInstance.hero = heroOne;
    expect(componentInstance.hero.name).toEqual(heroOne.name);
  });

  it('should render the hero name in an anchor tag', function () {
    componentInstance.hero = heroOne;
    fixture.detectChanges();

    // TODO 1й способ получения элемента
    // const elContent = fixture.nativeElement.querySelector('a').textContent;

    // TODO 2й способ получения элемента
    const elContent = fixture.debugElement.query(By.css('a')).nativeElement.textContent;

    expect(elContent).toContain(heroOne.name);
  });
});
