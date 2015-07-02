var comp = app.project.activeItem;

//var null_ctrl = comp.layers.addSolid([0,0,0], "Solid", comp.width, comp.height, 1);
//null_ctrl.name = null_name;
//null_ctrl.Effects.addProperty("ADBE Circle");    
//null_ctrl.Effects.addProperty("Circle"); // also works

function build_eval_string(layer, prop_array, expr)
{
    var layer = layer;
    var eval_string = "layer";

    for (j = 0; j < prop_array.length; j++)
    {
        eval_string += '.property("'+prop_array[j]+'")';
    }
    eval_string += '.expression = "' +expr+'"';
       
    try
    {
        
        eval(eval_string)
    }
    catch(e)
    {
        alert("Could not add expression\n" + String(e))
    }
}

function add_to_layers(sel_layers)
{
    alert(sel_layers.length)
    for (i = 0; i < sel_layers.length; i++)
    {
        build_eval_string(sel_layers[i], ["Effects", "Circle", "Radius"], "time*100") 
    }
}

var sel_layers = comp.selectedLayers;
add_to_layers(sel_layers);

//build_eval_string(null_ctrl, ["Effects", "Circle", "Radius"], "time*100")


