#target aftereffects

var proj = app.project; 
var comp = proj.activeItem; 
var sel = comp.selectedLayers; 
var sel_num = sel.length;

var source = sel[0];
var target = sel[1];

function exp_3d_to_2d()
{
    if(sel_num < 2)
    {
        alert("Select 2 layers!")
        return;
    }

    var exp = "l = thisComp.layer(\"" + source.name + "\");\n";
    exp += "l.toComp(l.anchorPoint);";


    target.property("position").expression = exp;
    
    //alert("Added expressions")
}

exp_3d_to_2d()