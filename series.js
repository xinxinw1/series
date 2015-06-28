function len(a){
  return a.length;
}

function add(){
  var a = arguments;
  if (len(a) == 0)return "0";
  var p = a[0];
  for (var i = 1; i < len(a); i++){
    p = R.add(p, a[i]);
  }
  return p;
}

function mul(){
  var a = arguments;
  if (len(a) == 0)return "1";
  var p = a[0];
  for (var i = 1; i < len(a); i++){
    p = R.mul(p, a[i]);
  }
  return p;
}

var sub = R.sub;
var div = R.div;

var even = R.evnp;
var odd = R.oddp;

var neg = R.neg;

var bin = R.bin;

var al = $.al;
//var fact = R.fact;

function fact(n){
  if (n == "0")return "1";
  return mul(n, fact(sub(n, "1")));
}

fact = his(fact);

// (n!)^2
function fact2(n){
  if (n == "0")return "1";
  return mul(n, n, fact2(sub(n, "1")));
}

fact2 = his(fact2);

var udfp = $.udfp;

function mod(a, b){
  return R.qar(a, b)[1];
}

function gcd(a, b){
  if (b == "0")return a;
  return gcd(b, mod(a, b));
}

//gcd = his2(gcd);

function redfrac(a, b){
  var g = gcd(a, b);
  if (g != "1")return [div(a, g), div(b, g)];
  return [a, b];
}

function sum(fr, to, f){
  var s = "0";
  for (var i = Number(fr); i <= Number(to); i++){
    s = add(s, f(String(i)));
  }
  return s;
}

function prod(fr, to, f){
  var s = "1";
  for (var i = Number(fr); i <= Number(to); i++){
    s = mul(s, f(String(i)));
  }
  return s;
}

// memoize
function his(f){
  var r = [];
  return function (a){
    if (udfp(r[a])){
      r[a] = f(a);
      return r[a];
    }
    return r[a];
  }
}

function his2(f){
  var r = [];
  return function (a, b){
    if (udfp(r[a])){
      r[a] = [];
      r[a][b] = f(a, b);
      return r[a][b];
    }
    if (udfp(r[a][b])){
      r[a][b] = f(a, b);
      return r[a][b];
    }
    return r[a][b];
  }
}

function his3(f){
  var r = [];
  return function (a, b, c){
    if (udfp(r[a])){
      r[a] = [];
      r[a][b] = [];
      r[a][b][c] = f(a, b, c);
      return r[a][b][c];
    }
    if (udfp(r[a][b])){
      r[a][b] = [];
      r[a][b][c] = f(a, b, c);
      return r[a][b][c];
    }
    if (udfp(r[a][b][c])){
      r[a][b][c] = f(a, b, c);
      return r[a][b][c];
    }
    return r[a][b][c];
  }
}

bin = his2(bin);

function arrof(n, m){
  var r = [];
  for (var i = Number(n); i <= Number(m); i++){
    r.push(String(i));
  }
  return r;
}

function mksgn(sgn, first){
  if (sgn)return "-";
  if (first)return "";
  return "+";
}

function gen(f, nm, n, sgn, pow){
  if (udfp(sgn))sgn = function (i){return false;};
  if (udfp(pow))pow = function (i){return i;};
  var first = true;
  var s = nm + "\\left(x\\right)=";
  if (Number(n) >= 0){
    var f0 = f("0");
    if (f0 != "0"){
      s += mksgn(sgn("0"), first) + f0 + "x^{" + pow("0") + "}";
      first = false;
    }
    for (var i = 1; i <= Number(n); i++){
      var fn = f(String(i));
      if (fn != "0"){
        s += mksgn(sgn(String(i)), first) + fn + "x^{" + pow(String(i)) + "}";
        first = false;
      }
    }
  }
  return s;
}

function gen2(f, g, nm, n, sgn, pow){
  return gen(function (i){
    var fn = f(i);
    if (fn == "0")return "0";
    return "\\frac{" + fn + "}{" + g(i) + "}";
  }, nm, n, sgn, pow);
}

function gen2red(f, g, nm, n, sgn, pow){
  var a = [];
  var b = [];
  
  function f2(i){
    if (udfp(a[i])){
      var r = redfrac(f(i), g(i));
      a[i] = r[0];
      b[i] = r[1];
    }
    return a[i];
  }
  
  function g2(i){
    if (udfp(b[i])){
      var r = redfrac(f(i), g(i));
      a[i] = r[0];
      b[i] = r[1];
    }
    return b[i];
  }
  
  return gen2(f2, g2, nm, n, sgn, pow);
}

function gen1(f, nm, n, sgn, pow){
  return gen2(f, function (i){return i + "!";}, nm, n, sgn, pow);
}

var fst = true;
function out(a){
  if (fst){
    $("out").innerHTML = a;
    fst = false;
  } else {
    $("out").innerHTML += "<br><br>" + a;
  }
}

function imp(a){
  $.att($.elm("script", {src: a}), $.doc.head);
}