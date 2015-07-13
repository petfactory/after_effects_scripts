var s = 'comp("Comp 1").layer("Layer 1").effect("val")("slider")'

//var re = new RegExp("pattern", "flags");
//var re = new RegExp('(comp)\("([\w\d ]*)"\)', 'g');

//var re = /pattern/flags;

//var re = /(comp)\("([\w\d ]*)"\)/g;
var re = /(comp)\("([\w\d ]*)"\)/;

var m = re.exec(s);
console.log(m);

var reg = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(reg, '$2, $1');
console.log(newstr);