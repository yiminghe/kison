// @ts-check
import { register } from './register';

register('iferror', {
  argumentLength: 2,
  interceptArgument({ value, index }) {
    if (index === 0 && value?.type !== 'error') {
      return { value };
    }
    return null;
  },
  allowErrorArgument: true,
  fn(args) {
    return args[1];
  },
});
