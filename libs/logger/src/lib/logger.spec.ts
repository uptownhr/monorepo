import { getTransport } from './logger';

describe('logger', () => {
  it('should work', () => {
    expect(getTransport({
      logLevel: 'debug'
    })).toBeTruthy()
  });
});
