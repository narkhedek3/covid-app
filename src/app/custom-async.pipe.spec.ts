import { CustomAsyncPipe } from './custom-async.pipe';

describe('CustomAsyncPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomAsyncPipe();
    expect(pipe).toBeTruthy();
  });
});
