var proj = app.project; 
var comp = proj.activeItem; 

var cam = comp.selectedLayers[0]

var x_null = comp.layers.addNull();
x_null.name = "x_axis"
x_null.threeDLayer = true;

var y_null = comp.layers.addNull();
y_null.name = "y_axis"
y_null.threeDLayer = true;

var z_null = comp.layers.addNull();
z_null.name = "z_axis"
z_null.threeDLayer = true;

var pos_null = comp.layers.addNull();
pos_null.name = "pos_null"
pos_null.threeDLayer = true;

// CAMERA X AXIS TO WORLS POS
var exp_x = "L1 = thisComp.layer(\"" + cam.name+"\");\n";
exp_x += "p = L1.toWorldVec([1,0,0]);\n";
exp_x += "s = 100;\n";
exp_x += "[p[0]*s, p[1]*s, p[2]*s]";

// CAMERA Y AXIS TO WORLS POS
var exp_y = "L1 = thisComp.layer(\"" + cam.name+"\");\n";
exp_y += "p = L1.toWorldVec([0,1,0]);\n";
exp_y += "s = 100;\n";
exp_y += "[p[0]*s, p[1]*s, p[2]*s]";

// CAMERA Z AXIS TO WORLS POS
var exp_z = "L1 = thisComp.layer(\"" + cam.name+"\");\n";
exp_z += "p = L1.toWorldVec([0,0,1]);\n";
exp_z += "s = 100;\n";
exp_z += "[p[0]*s, p[1]*s, p[2]*s]";

// CAMERA WORLD POS
var exp_pos = "L1 = thisComp.layer(\"" + cam.name+"\");\n";
exp_pos += "p = L1.toWorld([0,0,0]);\n";

x_null.property("Position").expression = exp_x;
y_null.property("Position").expression = exp_y;
z_null.property("Position").expression = exp_z;
pos_null.property("Position").expression = exp_pos;

fps = 25;
inc = 1.0 / (fps -1)

for (i = 0; i < fps; i++)
{ 
    var time = inc*i;

    var x_axis = x_null.property("position").valueAtTime(time, false);
    var y_axis = y_null.property("position").valueAtTime(time, false);
    var z_axis = z_null.property("position").valueAtTime(time, false);
    var pos = pos_null.property("position").valueAtTime(time, false);
}

//x_null.remove();
//y_null.remove();
//z_null.remove();
//pos_null.remove();