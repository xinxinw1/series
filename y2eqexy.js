// y''=e^x*y

function r(n){
  if (n == "0")return "1";
  if (n == "1")return "0";
  var n2 = sub(n, "2");
  return sum("0", n2, function (k){
    return mul(bin(n2, k), r(sub(n2, k)));
  });
}

function g(n){
  if (n == "0")return "0";
  if (n == "1")return "1";
  var n2 = sub(n, "2");
  return sum("0", n2, function (k){
    return mul(bin(n2, k), g(sub(n2, k)));
  });
}

r = his(r);
g = his(g);

function genr(n){
  return gen(r, "f", n);
}

function geng(n){
  return gen(g, "g", n);
}

//out($.dsp($.map(g, arrof("0", "100"))));
//genr("100")
out(genr("100"));
out(geng("100"));