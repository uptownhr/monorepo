import { newrelic } from './newrelic';

describe('newrelic', () => {
  it('should work', () => {
    expect(newrelic()).toEqual('newrelic');
  });
});
