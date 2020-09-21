import { MessageService } from './message.service';

describe('MessageService', () => {

  let messageService;
  const value: string = 'test string';
  let array: string[];
  let arrayLength: number;

  beforeEach(() => {
    messageService = new MessageService();
    array = messageService.messages;
  });

  it('should add message to array', function () {
    messageService.add(value);
    arrayLength = array.length;
    expect(arrayLength).toBe(1);
  });

  it('should clear array', function () {
    messageService.clear();
    arrayLength = array.length;
    expect(arrayLength).toBe(0);
  });

});
