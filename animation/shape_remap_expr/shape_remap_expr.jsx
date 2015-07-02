var comp = app.project.activeItem;
var sel_layers = comp.selectedLayers;
var num_layers = sel_layers.length;

var null_name = sel_layers[0].name+"_ctrl";
var null_ctrl = comp.layers.addNull(comp.duration);
null_ctrl.name = null_name
var slider_ctrl = null_ctrl.Effects.addProperty("ADBE Slider Control");
var effect_name = "value"; 
slider_ctrl.name = effect_name;

//alert(null_ctrl.name)

expr_string =  'val = thisComp.layer("'+null_name+'").effect("'+effect_name+'")("Slider");\n';
//expr_string += 'ease(val, 0, 50, 0, 100);';

var inc = 100/ num_layers;

for (var i = 0; i < num_layers ; i++)
{
    expr_string += 'ease(val, '+(i*inc)+','+ (i*inc+inc)+', 0, 100);';
    sel_layers[i].property("Contents").property("Trim Paths 1").property("start").expression = expr_string;
}
