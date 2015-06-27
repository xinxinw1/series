// cont frac to series

function t(n, m){
  if (m == "0")return "0";
  if (n == "0"){
    if (m == "2")return "1";
    return "0";
  }
  return add(t(n, sub(m, "1")), t(sub(n, "1"), add(m, "1")));
}

function c(n){
  return t(n, "1");
}

function sgn(n){
  return even(n);
}

t = his2(t);

function genc(n){
  return gen(c, "f", n, sgn);
}

//out($.dsp($.map(g, arrof("0", "100"))));
//genr("100")
out(genc("30"));