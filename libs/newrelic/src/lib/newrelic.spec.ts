import { NewrelicInterceptor } from './newrelic';

describe('newrelic', () => {
  it('should work', () => {
    const interceptor = new NewrelicInterceptor()

    expect(interceptor).toBeTruthy()
  });
});
