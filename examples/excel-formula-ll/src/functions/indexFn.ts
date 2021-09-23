import { register } from './register';

register('index', {
  // argumentsOptions: [
  //   null,
  //   {
  //     single: true,
  //   },
  //   {
  //     single: true,
  //   },
  // ],
  // minArgumentLength: 2,
  // maxArgumentLength: 3,
  fn(a) {
    return a[0];
  }
});
