export default function test(cal) {
  function c(i) {
    console.log(i + ' = ', cal.parse(i));
  }
  c('5*-2');
  c('2*5+6');
  c('1+2*5');
  c('(1+2)*5');
  c('11-2*5');
  c('2^1^3');
  c('2+*3*+5');
  c('2+/3');
}
