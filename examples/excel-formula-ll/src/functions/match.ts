import { register } from './register';

register('match', {
  // argumentOptions: [
  //   {
  //     single: true,
  //   },
  // ],
  // minArgumentLength: 2,
  // maxArgumentLength: 2,
  fn(a) {
    return a[0];
  },
});
