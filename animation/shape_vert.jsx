var fps = 25;

var shape = new Shape();
shape.vertices = [[0,0], [0,0]];
shape.inTangents = []
shape.outTangents = []
shape.closed = false;
 
var comp = app.project.activeItem;
var layer = comp.layers.addShape();
var group = layer.content.addProperty("ADBE Vector Group");                              // adds a Group (Empty) to the shape content
var shapeGroup = group.content.addProperty("ADBE Vector Shape - Group");       // adds a (custom) Path to that group
shapeGroup.name = "my shape";

// reset the position to 0,0
layer.property("position").setValue([0,0])


for (var i= 0; i < 50; i++)
{
    shape.vertices = [[0,0], [i*20,i*20]];
    shapeGroup.path.setValueAtTime(i/fps, shape);
 }
