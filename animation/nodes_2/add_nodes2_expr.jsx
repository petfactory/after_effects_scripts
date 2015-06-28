var proj = app.project; 
var comp = proj.activeItem; 
var sel = comp.selectedLayers; 
var sel_num = sel.length;

var source = sel[0];
var target = sel[1];

function add_nodes2_exp()
{
    if(sel_num < 2)
    {
        alert("Select 2 layers!")
        return;
    }

    var exp_pos_xy = "p = thisComp.layer(\"" + source.name +"\").transform.position;\n[p[0], p[1]]";
    var exp_pos_z = "thisComp.layer(\"" + source.name +"\").transform.position[2]";

    var exp_rot_x = "thisComp.layer(\"" + source.name +"\").rotationX + " + "thisComp.layer(\"" + source.name +"\").orientation[0];";
    var exp_rot_y = "thisComp.layer(\"" + source.name +"\").rotationY + " + "thisComp.layer(\"" + source.name +"\").orientation[1];";
    var exp_rot_z = "thisComp.layer(\"" + source.name +"\").rotationZ + " + "thisComp.layer(\"" + source.name +"\").orientation[2];";
    
    target.effect("Nodes 2")("Position").expression = exp_pos_xy;
    target.effect("Nodes 2")("Position Z").expression = exp_pos_z;
    
    target.effect("Nodes 2")("Rotation X").expression = exp_rot_x;
    target.effect("Nodes 2")("Rotation Y").expression = exp_rot_y;
    target.effect("Nodes 2")("Rotation Z").expression = exp_rot_z;

}

add_nodes2_exp()

