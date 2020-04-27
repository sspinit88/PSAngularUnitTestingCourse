import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow tests)', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    // создаем модуль с множеством компонентов
    TestBed.configureTestingModule({
      declarations: [
        HeroComponent,
      ],
      /*
      * NO_ERRORS_SCHEMA - сообщит ng, что для модуля не возникает ошибка,
      * если будет вставлен неизвестный атрибут в html-template
      * */
      schemas: [NO_ERRORS_SCHEMA],
    });

    // через переменную получим доступ ко всему содержимому компонента
    fixture = TestBed.createComponent(HeroComponent);
    // получим доступ ко всем методам и переменным компонента
    // fixture.componentInstance.onDeleteClick();

  });


  it('should have the correct hero', () => {
    // передаем данные @Input() hero: Hero;
    fixture.componentInstance.hero = { id: 1, name: 'Spider-Man', strength: 8 };
    expect(fixture.componentInstance.hero.name).toEqual('Spider-Man');
  });

  // тест проверяет шаблон
  it('should render the hero name in a anchor tag', () => {

    fixture.componentInstance.hero = { id: 1, name: 'Spider-Man', strength: 8 };

    // сообщаем ng, о том, что бы проверил изменения
    fixture.detectChanges();

    // Поскольку fixture обеспечивает доступ к debugElement,
    // мы теперь можем запросить элементы DOM и селектора.
    const deA = fixture.debugElement.query(By.css('a'));
    expect(
      deA.nativeElement.textContent
    ).toContain('Spider-Man', 'Контент не совпадает!');

    // теперь проверим, что имя героя отображается в теге привязки (см. html)
    // fixture.nativeElement - получает дескриптер dom-элемента
    expect(
      fixture.nativeElement.querySelector('a').textContent
    ).toContain('Spider-Man', 'Контент не совпадает!');

  });


});
