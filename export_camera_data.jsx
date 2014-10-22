var proj = app.project; 
var comp = proj.activeItem; 

var n = comp.layers.addNull();

n.property("Position").expression = "[10,20, 30]";


var val = n.position.value;
//alert(val)
//$.writeln(val)

n.remove();