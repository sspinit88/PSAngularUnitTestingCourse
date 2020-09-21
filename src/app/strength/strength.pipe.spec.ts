import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe;
  let value: number;
  let result: string;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('should display week if strength < 10', function () {
    value = 5;
    result = pipe.transform(value);
    expect(result).toBe(`${value} (weak)`);
  });

  it('should display strong if strength (value >= 10 && value < 20)', function () {
    value = 15;
    result = pipe.transform(value);
    expect(result).toBe(`${value} (strong)`);
  });

  it('should display unbelievable if strength > 20', function () {
    value = 50;
    result = pipe.transform(value);
    expect(result).toBe(`${value} (unbelievable)`);
  });

});
