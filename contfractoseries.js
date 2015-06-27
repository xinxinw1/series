// cont frac to series

function s(n, m, r){
  if (n == "-1")return "0";
  if (n == "0")return "1";
  return sum("1", m, function (u){
    return mul(mul(prod("1", sub(u, "1"), a),
                   prod(add(u, "2"), r, a)),
                 s(sub(n, "1"), add(u, "1"), add(r, "1")));
  });
}

function p(n){
  var r = s(sub(n, "1"), "1", "2");
  if (even(n))return neg(r);
  return r;
}

function q(n){
  if (n == "0")return "1";
  return mul(q(sub(n, "1")), prod("1", n, a));
}

s = his3(s);
q = his(q);

function a(n){
  return n;
}

//a = his(a);

function genc(n){
  return gen2(p, q, "f", n);
}

//out($.dsp($.map(g, arrof("0", "100"))));
//genr("100")
out(genc("20"));