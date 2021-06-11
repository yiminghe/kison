export default function test(cal) {
  console.log(cal.parse("1+2*5"));
  console.log(cal.parse("(1+2)*5"));
  console.log(cal.parse("11-2*5"));
  let input = "2+*3*+5";
  console.log(cal.parse(input));
  console.log(cal.parse("2+/3"));
}
