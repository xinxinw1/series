// y''+2y'+y=sin(x)

function d(n){
  if (n == "0")return "0";
  if (n == "1")return "0";
  var s = "0";
  switch (Number(n) % 4){
    case 1: s = "-1"; break;
    case 3: s = "1"; break;
  }
  var d1 = d(sub(n, "1"));
  var d2 = d(sub(n, "2"))
  return sub(s, mul("2", add(d1, d2)));
}

function gend(n){
  return gen1(d, "f", n);
}

d = his(d);

//$.al($.map(p, arrof("0", "20")));
out(gend("100"));