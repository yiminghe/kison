import { register } from './register';

register('filter', {
  argumentLength: 2,
  fn(a) {
    return a[0];
  },
});
