// cont frac to series
// current data for x/(1+x^2/(2+x^2/(3+x^2/(4+...))))
// http://www.jstor.org/stable/2322267?Search=yes&resultItemClick=true&&searchUri=%2Faction%2FdoAdvancedSearch%3Fq4%3D%26amp%3Bisbn%3D%26amp%3Bf2%3Dall%26amp%3Bc6%3DAND%26amp%3Bf5%3Dall%26amp%3Bwc%3Don%26amp%3Bf1%3Dall%26amp%3Bq5%3D%26amp%3Bf6%3Dall%26amp%3Bq0%3Dcallan%26amp%3Bgroup%3Dnone%26amp%3Bsd%3D1988%26amp%3Bc4%3DAND%26amp%3Bq6%3D%26amp%3Bf0%3Dau%26amp%3Bpt%3DAmerican%2BMathematical%2BMonthly%26amp%3Bc2%3DAND%26amp%3Bc3%3DAND%26amp%3Bq3%3D%26amp%3Bf3%3Dall%26amp%3Bed%3D1988%26amp%3Bla%3D%26amp%3Bc5%3DAND%26amp%3Bq1%3D%26amp%3Bf4%3Dall%26amp%3Bacc%3Doff%26amp%3Bq2%3D%26amp%3Bc1%3DAND&loginSuccess=true&seq=1#page_scan_tab_contents
// https://oeis.org/A039910/table

function s(n, m, r){
  if (n == "0")return "0";
  if (n == "1")return "1";
  if (m == "0")return "0";
  return add(s(n, sub(m, "1"), r),
             mul(prod("1", sub(m, "1"), a),
                 prod(add(m, "2"), r, a),
                 s(sub(n, "1"), add(m, "1"), add(r, "1"))));
}

// normalize to v_n/(n!)^2*x^(2n+1)

function p(n){
  var f = s(n, "1", "2");
  var g = q(n);
  var r = redfrac(f, g);
  //al(div(fact2(n), r[1]));
  return mul(r[0], div(fact2(n), r[1]));
}

function q(n){
  if (n == "0")return "1";
  return mul(q(sub(n, "1")), prod("1", n, a));
}

function q2(n){
  return "\\left(" + n + "!\\right)^2";
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
  return n;
}

//a = his(a);

function genc(n){
  return gen2(p, q2, "f", n, sgn, pow);
}

//out($.dsp($.map(g, arrof("0", "100"))));
//genr("100")
out(genc("30"));