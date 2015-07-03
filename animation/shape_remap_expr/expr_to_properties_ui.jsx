function build_eval_string(layer, prop_array, expr)
{
    var layer = layer;
    var eval_string = 'layer';

    for (j = 0; j < prop_array.length; j++)
    {
        eval_string += '.property("'+prop_array[j]+'")';
    }
    eval_string += ".expression = \'"+ expr +"\'";
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

function myScript(thisObj)
{
    function myScript_buildUI(thisObj)
    {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Add expr", [0, 0, 300, 300]);
        var min_width = 180;
        myPanel.alignChildren = ["fill",""];
        myPanel.alignment = ['left', 'top'];
        
        myPanel.add ("statictext", undefined, "Replace:");
        
        var replace_0 = myPanel.add ("edittext", undefined, "");
        replace_0.characters = 20;
        replace_0.minimumSize.width = min_width;
        
        var replace_1 = myPanel.add ("edittext", undefined, "");
        replace_1.characters = 20;
        replace_1.minimumSize.width = min_width;
        
        var replace_2 = myPanel.add ("edittext", undefined, "");
        replace_2.characters = 20;
        replace_2.minimumSize.width = min_width;
        
        var replace_3 = myPanel.add ("edittext", undefined, "");
        replace_3.characters = 20;
        replace_3.minimumSize.width = min_width;
        
        
        myPanel.add ("statictext", undefined, "Expression:");
        
        add_ctrl_button = myPanel.add ("button", undefined, "Add expression ctrl string");
        add_ctrl_button.minimumSize.width = min_width;
        add_ctrl_button.onClick = function()
        {
            var comp = app.project.activeItem;     
            if (comp == null) {alert("Select a comp!"); return;}
            
            var sel_layers = comp.selectedLayers;
            if (sel_layers.length < 1) {alert("Nothing is selected!"); return;}
            
            var sel_properties = comp.selectedProperties;
            if (sel_properties.length < 1) {alert("Select a property!"); return;}
            
            prop_grp_name = sel_properties[0].name
            // index 1 will give us the name, 2 the compositing options
            prop_name = sel_properties[0].property(1).name

            ctrl_string = 'thisComp.layer("'+sel_layers[0].name+'").effect("'+prop_grp_name+'")("'+prop_name+'")';  
            
            if (exp_edittext.text.length < 1) exp_edittext.text = ctrl_string;
            else alert("The edit text is not empty\nRemove all text and try again.")

        }
            
        var exp_edittext = myPanel.add ("edittext", [0, 0, 200, 70], "", {multiline: true, scrolling: true, wantReturn: true});
        //var exp_edittext = myPanel.add ("edittext", undefined, "");
        exp_edittext.characters = 20;
        exp_edittext.minimumSize.width = min_width;
        
        myPanel.add ("statictext", undefined, "Property:");
        
        var prop_edittext = myPanel.add ("edittext", undefined, "");
        prop_edittext.characters = 20;
        prop_edittext.minimumSize.width = min_width;
        
        add_exp_button = myPanel.add ("button", undefined, "Add expression");
        add_exp_button.minimumSize.width = min_width;
        add_exp_button.onClick = function()
        {
            
            var comp = app.project.activeItem;
            if (comp == null || !(comp instanceof CompItem)) { alert("Select a comp!"); return; }
            
            var exp_raw_text = exp_edittext.text;
            var property_string = prop_edittext.text;
            var property_array = property_string.split(".");
            var sel_layers = comp.selectedLayers;
            
            if (sel_layers.length < 1) { alert('Nothing is selected!'); return;}
                        
            var error_array = [];
            
            for (i = 0; i < sel_layers.length; i++)
            {
                //var exp_string = exp_raw_text;
                // total hack to remove the slanted quotationmark, look into this...
                var exp_string = exp_raw_text.replace("\”", "\"");
                
                exp_string = exp_string.replace('{0}', eval(replace_0.text.replace("i", i)));
                exp_string = exp_string.replace('{1}', eval(replace_1.text.replace("i", i)));
                exp_string = exp_string.replace('{2}', eval(replace_2.text.replace("i", i)));
                exp_string = exp_string.replace('{3}', eval(replace_3.text.replace("i", i)));
                
                //alert(exp_string)
                
                error_layer = build_eval_string(sel_layers[i], property_array, String(exp_string)) 
                if (error_layer  != null) error_array.push(error_layer)
                
                //var property_string = prop_edittext.text;                  
                //add_to_layers(comp, property_string, exp_string);
            }
            
            if (error_array.length > 0)
            {
                alert("Could not add expression to "+error_array.length+" layer(s)\nMake sure the specified properties exists");
            }

        }

        remove_exp_button = myPanel.add ("button", undefined, "Remove expression");
        remove_exp_button.minimumSize.width = min_width;
        
        remove_exp_button.onClick = function()
        {
            if (!confirm("Remove expressions from selected layers?")) return;
            
            var comp = app.project.activeItem;
            if (comp == null || !(comp instanceof CompItem)) { alert("Select a comp!"); return; }
            
            var property_string = prop_edittext.text;
            var property_array = property_string.split(".");
            var sel_layers = comp.selectedLayers;
            for (i = 0; i < sel_layers.length; i++)
            {
                error_layer = build_eval_string(sel_layers[i], property_array, "");
            }
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