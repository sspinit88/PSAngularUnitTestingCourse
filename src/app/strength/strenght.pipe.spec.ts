import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('should display weak if Strength is 5 ', () => {
    const testValue = 5;
    expect(pipe.transform(testValue)).toEqual('5 (weak)');
  });

  it('should display weak if Strength is 10 ', () => {
    const testValue = 10;
    expect(pipe.transform(testValue)).toEqual('10 (strong)');
  });

});
