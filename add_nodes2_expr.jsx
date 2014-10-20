#target aftereffects

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


    var exp_pos = "thisComp.layer(\"" + source.name +"\").transform.position";
    var exp_rot_x = "thisComp.layer(\"" + source.name +"\").transform.xRotation";
    var exp_rot_y = "thisComp.layer(\"" + source.name +"\").transform.yRotation";
    var exp_rot_z = "thisComp.layer(\"" + source.name +"\").transform.zRotation";

    //$.writeln(exp)
    //target.property("position").expression = exp;
    target.property("xRotation").expression = exp_rot_x;
    target.property("yRotation").expression = exp_rot_y;
    target.property("zRotation").expression = exp_rot_z;
    
    //alert("Added expressions")
}

add_nodes2_exp()