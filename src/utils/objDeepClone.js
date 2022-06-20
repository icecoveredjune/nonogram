/**
 * make deep copy of any objects properly(which includes regex,DATE,etc)
 * @param  {object} o source object
 * @param  {} h cache (organized as array: [key,value,key,value,...])
 * @return {array} deep copy of new object
 */
function clone(o, h) {
  var i,
    r,
    x,
    t = [Array, Date, Number, String, Boolean],
    s = {}.toString;
  h = h || [];
  for (i = 0; i < h.length; i += 2) if (o === h[i]) r = h[i + 1];
  if (!r && o && typeof o == 'object') {
    r = {};
    for (i = 0; i < t.length; i++)
      if (s.call(o) == s.call((x = new t[i](o)))) r = i ? x : [];
    h.push(o, r);
    for (i in o) if (s.hasOwnProperty.call(o, i)) r[i] = clone(o[i], h);
  }
  return r || o;
}
export default clone;
