﻿function replaceAll(find, replace, str) {  return str.replace(new RegExp(find, 'g'), replace);}function build_eval_string(layer, prop_array, expr){    var layer = layer;    var eval_string = "layer";    // construct the properties string    for (j = 0; j < prop_array.length; j++)    {        eval_string += ".property(\""+prop_array[j]+"\")";    }    eval_string += ".expression = \""+expr+"\"";    try    {        eval(eval_string);        return null;    }    catch(e)    {        return layer;    }}function replace_editfield(parent, label){    var replace_0_grp = parent.add ("group");            var o = replace_0_grp.add ("statictext", undefined, label);    o.maximumSize.width = 20;    o.minimumSize.width = 20;    var replace_0 = replace_0_grp.add ("edittext", undefined, "");    replace_0.characters = 20;        replace_0.alignment =  ["fill",""];        return replace_0;}function myScript(thisObj){    function myScript_buildUI(thisObj)    {        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Add expr", [0, 0, 300, 300]);        var min_width = 120;        myPanel.alignChildren = ["fill",""];                var propety_panel = myPanel.add("panel", undefined, "Property");        propety_panel.alignment = ["fill","top"];        propety_panel.alignChildren = ["fill",""];                var prop_edittext = propety_panel.add ("edittext", undefined, "Opacity");        prop_edittext.characters = 20;        prop_edittext.minimumSize.width = min_width;                var replace_panel = myPanel.add("panel", undefined, "Replace");        replace_panel.alignChildren = ["fill",""];        replace_panel.alignment = ["fill","top"];                var replace_0 = replace_editfield(replace_panel, "#0");        var replace_1 = replace_editfield(replace_panel, "#1");        var replace_2 = replace_editfield(replace_panel, "#2");        var replace_3 = replace_editfield(replace_panel, "#3");         var expr_panel = myPanel.add("panel", undefined, "Expression");        expr_panel.alignment = ["fill","fill"];                add_ctrl_button = expr_panel.add ("button", undefined, "Copy ctrl string");        add_ctrl_button.alignment = ["fill","top"];        add_ctrl_button.onClick = function()        {            var comp = app.project.activeItem;                 if (comp == null) {alert("Select a comp!"); return;}                        var sel_layers = comp.selectedLayers;            if (sel_layers.length < 1) {alert("Nothing is selected!"); return;}                        var sel_properties = comp.selectedProperties;            if (sel_properties.length < 1) {alert("Select a property!"); return;}            prop_grp_name = sel_properties[0].name            // index 1 will give us the name, 2 the compositing options            prop_name = sel_properties[0].property(1).name                        var ctrl_string = 'thisComp.layer\\\(\\\"'+sel_layers[0].name+'\\\"\\\).effect\\\(\\\"'+prop_grp_name+'\\\"\\\)\\\(\\\"'+prop_name+'\\\"\\\)';            system.callSystem("echo " + ctrl_string + " | pbcopy");        }                    var exp_edittext = expr_panel.add ("edittext", [0, 0, 200, 70], "", {multiline: true, scrolling: true, wantReturn: true});        exp_edittext.alignment = ["fill","fill"];                var button_grp = myPanel.add("group", undefined);        button_grp.alignment = ["fill","bottom"];        button_grp.alignChildren = ["fill",""];                remove_exp_button = button_grp.add ("button", undefined, "Remove expression");        remove_exp_button.minimumSize.width = min_width;                remove_exp_button.onClick = function()        {            if (!confirm("Remove expressions from selected layers?")) return;                        var comp = app.project.activeItem;            if (comp == null || !(comp instanceof CompItem)) { alert("Select a comp!"); return; }                        var property_string = prop_edittext.text;            var property_array = property_string.split(".");            var sel_layers = comp.selectedLayers;            for (i = 0; i < sel_layers.length; i++)            {                error_layer = build_eval_string(sel_layers[i], property_array, "");            }        }                add_exp_button = button_grp.add ("button", undefined, "Add expression");        add_exp_button.minimumSize.width = min_width;        add_exp_button.onClick = function()        {                        var comp = app.project.activeItem;            if (comp == null || !(comp instanceof CompItem)) { alert("Select a comp!"); return; }                        var exp_raw_text = exp_edittext.text;            var property_string = prop_edittext.text;            var property_array = property_string.split(".");            var sel_layers = comp.selectedLayers;            var num_layers = sel_layers.length;                        if (num_layers < 1) { alert('Nothing is selected!'); return;}                                    var error_array = [];                        for (i = 0; i <num_layers; i++)            {                var t = i/(num_layers-1);                                var exp = replaceAll("\n", "\\n", exp_raw_text);                exp = replaceAll("”", "\"", exp);                exp = replaceAll("“", "\"", exp);                exp = replaceAll("\\\(", "\\\(", exp);                exp = replaceAll("\\\)", "\\\)", exp);                exp = replaceAll("\"", "\\\"", exp);                                if (replace_0.text.length>0) exp = replaceAll("#0", eval(replaceAll("t", t,replaceAll("i", i, replace_0.text))), exp);                if (replace_1.text.length>0) exp = replaceAll("#1", eval(replaceAll("t", t,replaceAll("i", i, replace_1.text))), exp);                if (replace_2.text.length>0) exp = replaceAll("#2", eval(replaceAll("t", t,replaceAll("i", i, replace_2.text))), exp);                if (replace_3.text.length>0) exp = replaceAll("#3", eval(replaceAll("t", t,replaceAll("i", i, replace_3.text))), exp);                                error_layer = build_eval_string(sel_layers[i], property_array, exp)                                 if (error_layer  != null) error_array.push(error_layer)            }                        if (error_array.length > 0)            {                alert("Could not add expression to "+error_array.length+" layer(s)\nMake sure the specified properties exists");            }        }        //Setup panel sizing and make panel resizable        myPanel.layout.layout(true);        myPanel.layout.resize();        myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}        return myPanel;    }    var myScriptPal = myScript_buildUI(thisObj);     if ((myScriptPal != null) && (myScriptPal instanceof Window))    {        myScriptPal.center();        myScriptPal.show();    }}      myScript(this);