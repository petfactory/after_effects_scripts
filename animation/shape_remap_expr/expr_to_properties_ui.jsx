function build_eval_string(layer, prop_array, expr)
{
    var layer = layer;
    var eval_string = 'layer';

    for (j = 0; j < prop_array.length; j++)
    {
        eval_string += '.property("'+prop_array[j]+'")';
    }
    eval_string += ".expression = \'"+ expr +"\'";
    //eval_string += expr
    //alert(eval_string)
    try
    {
        eval(eval_string)
        return null;
    }
    catch(e)
    {
        return layer;
    }
}

function add_to_layers(comp, prop_string, expr)
{
    var error_array = [];
    var prop_array = prop_string.split(".");
    var sel_layers = comp.selectedLayers;
    
    if (sel_layers.length < 1)
    {
        alert('Nothing is selected!');
        return;
    }
    for (i = 0; i < sel_layers.length; i++)
    {
        error_layer = build_eval_string(sel_layers[i], prop_array, expr) 
        
        if (error_layer  != null)
        {
            error_array.push(error_layer)
        }
    }

    if (error_array.length > 0)
    {
        alert("Could not add expression to "+error_array.length+" layer(s)\nMake sure the specified properties exists");
    }
}


function myScript(thisObj)
{
    function myScript_buildUI(thisObj)
    {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Add expr", [0, 0, 300, 300]);

        myPanel.add ("statictext", undefined, "Property:");
        
        var min_width = 180;
        
        var prop_edittext = myPanel.add ("edittext", undefined, "Opacity");
        prop_edittext.characters = 20;
        prop_edittext.minimumSize.width = min_width;
        
        myPanel.add ("statictext", undefined, "Expression:");
        
        var exp_edittext = myPanel.add ("edittext", undefined, "time*100");
        exp_edittext.characters = 20;
        exp_edittext.minimumSize.width = min_width;

        render_button = myPanel.add ("button", undefined, "Add expression");
        render_button.minimumSize.width = min_width;
        render_button.onClick = function()
        {
            var comp = app.project.activeItem;
            if (comp == null || !(comp instanceof CompItem))
            {
                alert("Select a comp!")
                return
            }
        
            var property_string = prop_edittext.text;
            var exp_string = exp_edittext.text;
                                    
            add_to_layers(comp, property_string, exp_string);
        }

        //Setup panel sizing and make panel resizable
        myPanel.layout.layout(true);
        myPanel.layout.resize();
        myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}

        return myPanel;
    }


    var myScriptPal = myScript_buildUI(thisObj);
 
    if ((myScriptPal != null) && (myScriptPal instanceof Window))
    {
        myScriptPal.center();
        myScriptPal.show();
    }
}
      
myScript(this);