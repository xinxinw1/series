// cont frac to series
// current data for x/(1+x^2/(3+x^2/(5+x^2/(7+...))))
// https://en.wikipedia.org/wiki/Genocchi_number
// https://oeis.org/A001469
// https://books.google.ca/books?id=gE_MBQAAQBAJ&pg=PA29&lpg=PA29&dq=1,+1,+3,+17,+155,+2073,+38227,+929569&source=bl&ots=HL6FW2gueF&sig=gOcSkarW2A3hnW8HkcYvOCGpUf4&hl=en&sa=X&ei=3E2PVbzqBsu3yAS38KGQCg&ved=0CCsQ6AEwAw#v=onepage&q=1%2C%201%2C%203%2C%2017%2C%20155%2C%202073%2C%2038227%2C%20929569&f=false

function s(n, m, r){
  if (n == "0")return "0";
  if (n == "1")return "1";
  if (m == "0")return "0";
  return add(s(n, sub(m, "1"), r),
             mul(prod("1", sub(m, "1"), a),
                 prod(add(m, "2"), r, a),
                 s(sub(n, "1"), add(m, "1"), add(r, "1"))));
}

// normalize to 2^(2n-1)*v_n/(2n)!*x^(2n-1)

function pow2n(n){
  if (n == "0")return "1";
  return mul("2", pow2n(sub(n, "1")));
}

pow2n = his(pow2n);

function p(n){
  var f = s(n, "1", "2");
  var g = q(n);
  var r = redfrac(f, g);
  var h = mul(r[0], div(fact(mul("2", n)), r[1]));
  //al(div(h, pow2n(add(mul("2", n), "1"))));
  if (n == "0")return "0";
  return "2^{" + sub(mul("2", n), "1") + "}\\cdot " + div(h, pow2n(sub(mul("2", n), "1")));
}

function q(n){
  if (n == "0")return "1";
  return mul(q(sub(n, "1")), prod("1", n, a));
}

function q2(n){
  return mul("2", n) + "!";
}

/*function p(n){
  return s(n, "1", "2");
}

function q(n){
  if (n == "0")return "1";
  return mul(q(sub(n, "1")), prod("1", n, a));
}*/

function sgn(n){
  return even(n);
}

function pow(n){
  if (n == "0")return "0";
  return sub(mul(n, "2"), "1");
}

s = his3(s);
q = his(q);

function a(n){
  return sub(mul("2", n), "1");
}

//a = his(a);

function genc(n){
  return gen2(p, q2, "f", n, sgn, pow);
}

/*function genc(n){
  return gen2red(p, q, "f", n, sgn, pow);
}*/

//out($.dsp($.map(g, arrof("0", "100"))));
//genr("100")
out(genc("30"));