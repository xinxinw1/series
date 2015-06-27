var add = R.add;
var sub = R.sub;
var mul = R.mul;
var div = R.div;

var even = R.evnp;
var odd = R.oddp;

var neg = R.neg;

var bin = R.bin;

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

function udfp(a){
  return a === undefined;
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

function gen(f, nm, n){
  var s = nm + "\\left(x\\right)=";
  if (Number(n) >= 0){
    s += f("0");
    for (var i = 1; i <= Number(n); i++){
      s += "+" + f(String(i)) + "x^{" + String(i) + "}";
    }
  }
  return s;
}

function gen2(f, g, nm, n){
  return gen(function (i){
    return "\\frac{" + f(i) + "}{" + g(i) + "}";
  }, nm, n);
}

function gen1(f, nm, n){
  return gen2(f, function (i){return i + "!";}, nm, n);
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