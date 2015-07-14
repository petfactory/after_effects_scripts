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



/*

var re = /(comp)\("([\w\d ]*)"\)/g;
//var re = /comp\("[\w\d ]*"\)/g;
//var s = "var a = comp(\"Comp 1\").layer(\"ctrl\").effect(\"angle\")(\"Angle\")*.01;\nvar r = comp(\"Comp 1\").layer(\"ctrl\").effect(\"radius\")(\"Slider\");\nvar x = Math.cos(a*#0)*r+512;\nvar y = Math.sin(a*#0)*r+512;\n[x, y]";
var s = "var a = comp(\"Comp 3\").layer(\"ctrl\").effect(\"angle\")(\"Angle\")*.01;\nvar r = comp(\"Comp 2\").layer(\"ctrl\").effect(\"radius\")(\"Slider\");\nvar x = Math.cos(a*#0)*r+512;\nvar y = Math.sin(a*#0)*r+512;\n[x, y]";
//var m = re.exec(s);
//console.log(m);

var m2 = s.match(re);
console.log(m2);

*/