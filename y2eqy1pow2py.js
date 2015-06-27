// y'' = (y')^2 + y

var a0 = "0";
var a1 = "1";

function p(n){
  if (n == "0")return a0;
  if (n == "1")return a1;
  var n2 = sub(n, "2");
  var s1 = p(n2);
  var s2 = sum("0", n2, function (k){
    var k1 = add(k, "1");
    return mul(bin(n2, k), mul(p(k1), p(sub(n, k1))));
  });
  return add(s1, s2);
}

function genp(n){
  return gen(p, "f", n);
}

p = his(p);

//$.al($.map(p, arrof("0", "20")));
out(genp("100"));
