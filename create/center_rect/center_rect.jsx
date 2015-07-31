function fit_center_rect(total_length, item_length)
{

    var ret_list = [];

    var float_fit = total_length/item_length;
    var int_fit = Math.ceil(float_fit);

    // add one to the count if we have an even number
    if (int_fit % 2 == 0) int_fit += 1;

    // calculate the protrusion beyong the edges
    protrusion = 0;

    if (int_fit > 1) protrusion = ((int_fit * item_length) - total_length)*.5;

    for (var i=0; i < int_fit; i++)
    {
        var p1 = Math.max(0, (i * item_length - protrusion));
        var p2 = Math.min(total_length, (p1 + item_length));

        if (i == 0) p2 -= protrusion

        ret_list.push(p1, p2);
    }

    return ret_list
}

function build_vert_array(w, rw, h, rh)
{
    px_list = fit_center_rect(w, rw);
    py_list = fit_center_rect(h, rh);

    num_rows = py_list.length*.5;
    num_cols = px_list.length*.5;

    pos_array = [];

    for (var i = 0; i < num_rows; i++)
    {
        var y1 = py_list[i*2];
        var y2 = py_list[i*2+1];

        for (var j = 0; j < num_cols; j++)
        {
            var x1 = px_list[j*2];
            var x2 = px_list[j*2+1];

            var p1 = [x1, y1]
            var p2 = [x2, y1]
            var p3 = [x2, y2]
            var p4 = [x1, y2]
            
            pos_array.push([p1, p2, p3, p4]);
        }
    }

    return pos_array;
}

function add_rect(verts)
{
    var active_item = app.project.activeItem;
    
    for (var i = 0; i < verts.length; i++)
    {
        
        var layer = active_item.layers.addShape();
        layer.property("position").setValue([0,0])

        // create the shape
        var shape = new Shape();
        shape.vertices = verts[i];
        shape.inTangents = []
        shape.outTangents = []
        shape.closed = true;

        var group = layer.content.addProperty("ADBE Vector Group");
        var shapeGroup = group.content.addProperty("ADBE Vector Shape - Group"); 
        shapeGroup.path.setValue(shape); 

        var myFill = group.property("Contents").addProperty("ADBE Vector Graphic - Fill"); 
        myFill.property("Color").setValue([1,1,1]);
        
        var myStroke = group.property("Contents").addProperty("ADBE Vector Graphic - Stroke"); 
        myStroke.property("Color").setValue([0,0,0]);
    
    }
 }

var w = 1920;
var h = 1080;

var rw = 640;
var rh = 360;

rect_arr = build_vert_array(w, rw, h, rh);
add_rect(rect_arr)