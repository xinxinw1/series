// n factorial

function c(n){
  return fact(n);
}

function sgn(n){
  return even(n);
}

function genc(n){
  return gen(c, "f", n, sgn);
}

//out($.dsp($.map(g, arrof("0", "100"))));
//genr("100")
out(genc("30"));