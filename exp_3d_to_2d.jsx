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



/*

L1 = comp("Comp 1").layer("source_3d")
P = L1.toWorld(L1.anchorPoint);
L2 = thisComp.layer("nested_comp");
L2.toComp(P);


2D comp pos from a 2d pos in a transformed 3d comp
L1 = comp("3d_comp").layer("null_2d");
P = L1.toWorld(L1.anchorPoint);
L2 = thisComp.layer("3d_comp");
L2.toComp(P);


*/