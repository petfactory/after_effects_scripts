﻿if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx,escapable,gap,indent,meta,rep;if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()isSupported = function(file) {    try {        //macs will send a file or a folder through here.  we need to respond true to folder to allow users to navigate through their directory structure        if (file instanceof Folder)            return true;        else            return file.name.match(/\.json/i) != null;    } catch (e) {        alert("Error in isSupported method: " + e);    }}function replaceAll(find, replace, str) {  return str.replace(new RegExp(find, 'g'), replace);}function build_eval_string(layer, prop_array, expr){    var layer = layer;    var eval_string = "layer";    // construct the properties string    for (j = 0; j < prop_array.length; j++)    {        eval_string += ".property(\""+prop_array[j]+"\")";    }    eval_string += ".expression = \""+expr+"\"";    try    {        eval(eval_string);        return null;    }    catch(e)    {        return layer;    }}function replace_editfield(parent, label){    var replace_0_grp = parent.add ("group");            var o = replace_0_grp.add ("statictext", undefined, label);    o.maximumSize.width = 20;    o.minimumSize.width = 20;    var replace_0 = replace_0_grp.add ("edittext", undefined, "");    replace_0.characters = 20;        replace_0.alignment =  ["fill",""];        return replace_0;}function myScript(thisObj){    function myScript_buildUI(thisObj)    {        function addPreset(name, property, expression, r0, r1, r2, r3)        {            var preset = {}            preset.name = name;            preset.property = property;            preset.expression = expression;            preset.r0 = r0;            preset.r1 = r1;            preset.r2 = r2;            preset.r3 = r3;                        var index = preset_array.length;                        preset_dropdown.add("item", preset.name, index+1)            preset_array.push(preset)            preset_dropdown.selection = index;        }            function removePreset(index)        {            if (index < 1)            {                alert("This can not be removed");                return;            }            if (index > (preset_array.length-1))            {                alert("Index error");                return;            }            preset_array.splice(index, 1);            preset_dropdown.remove(index);            preset_dropdown.selection = index-1;                }                var preset_array = [];                var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Add expr", [0, 0, 300, 300]);        var min_width = 120;                        var preset_panel = myPanel.add("panel", undefined, "Presets");        preset_panel.orientation = "column";        preset_panel.alignment = ["fill","top"];        preset_panel.alignChildren = ["fill",""];                var preset_top_grp = preset_panel.add("group", undefined);        preset_top_grp.alignChildren = ["fill",""];        var preset_dropdown = preset_top_grp.add ("dropdownlist", undefined, null);        preset_dropdown.minimumSize.width = 150;        preset_dropdown.alignment= ["left",""];                        set_preset_button = preset_top_grp.add ("button", undefined, "Set preset");        set_preset_button.alignment= ["left",""];        set_preset_button.onClick = function()        {             var index = preset_dropdown.selection.index;            var preset = preset_array[index];                        if (!ScriptUI.environment.keyboardState.shiftKey) if (!confirm("The preset will overwrite current text\nAre you sure you want to continue?")) return;                        preset_name.text = preset.name;            prop_edittext.text = preset.property;            replace_0.text = preset.r0;            replace_1.text = preset.r1;            replace_2.text = preset.r2;            replace_3.text = preset.r3;            exp_edittext.text = preset.expression;            //alert(preset.name +" "+ preset.property+" "+ preset.r0 +" "+ preset.r1+" "+ preset.r2 +" "+  preset.r3+" "+  preset.expression);         }            remove_preset_button = preset_top_grp.add ("button", undefined, "Remove preset");        remove_preset_button.alignment= ["left",""];        remove_preset_button.onClick = function()        {            if (!ScriptUI.environment.keyboardState.shiftKey) if (!confirm("This will remove the preset from the dropdown menu\n Are you sure you want to continue?")) return;            removePreset(preset_dropdown.selection.index);        }                  var preset_middle_grp = preset_panel.add("group", undefined);        add_preset_button = preset_middle_grp.add ("button", undefined, "Add preset");        add_preset_button.alignment= ["left",""];        add_preset_button.onClick = function()        {             var name = preset_name.text;            if(name.length < 1)            {                alert("Give the preset a name")                return;            }                        var existing_preset = null;            // check it the preset name exist, promt for overwrite...            for (i = 0; i < preset_array.length; i++)            {                if (preset_array[i].name == name)                {                    if (name == "Reset")                    {                        alert("The Reset preset cannot be overwritten.");                        return;                    }                                    if (!ScriptUI.environment.keyboardState.shiftKey) if (!confirm("A preset named \""+name+"\" exists\nOvertite the preset?")) return;                    existing_preset = preset_array[i];                    break;                }              }            var expr = exp_edittext.text;            var prop = prop_edittext.text;            var r0 = replace_0.text;            var r1 = replace_1.text;            var r2 = replace_2.text;            var r3 = replace_3.text;                        if (existing_preset == null)            {                // (name, property, expression, r0, r1, r2, r3)                addPreset(name, prop, expr, r0,r1, r2, r3);            }                            else            {                existing_preset.name = name;                existing_preset.property = prop;                existing_preset.expression = expr;                existing_preset.r0 = r0;                existing_preset.r1 = r1;                existing_preset.r2 = r2;                existing_preset.r3 = r3;                }        }             var preset_name = preset_middle_grp.add ("statictext", undefined, "Name:");        preset_name.alignment = ["left", ""];                 var preset_name = preset_middle_grp.add ("edittext", undefined, "");        preset_name.alignment = ["fill", ""];                               var preset_btm_grp = preset_panel.add("group", undefined);            load_preset_button = preset_btm_grp.add ("button", undefined, "Load");        load_preset_button.alignment = ["left",""];        load_preset_button.onClick = function()        {            var file = File.openDialog("Open Preset file", isSupported, false) ;                        if (file)            {                if (file.open("r"))                {                    file.encoding = "UTF-8";                    var json = file.read();                    json_data = JSON.parse(json)                    file.close()                                                            var presets = json_data.presets;                                        for (i = 0; i<presets.length; i++)                    {                        // (name, property, expression, r0, r1, r2, r3)                        var p = presets[i];                        addPreset(p.name, p.property, p.expression, p.r0, p.r1, p.r2, p.r3);                    }                }            }        }                save_preset_button = preset_btm_grp.add ("button", undefined, "Save");        save_preset_button.alignment = ["left",""];        save_preset_button.onClick = function()        {            if (preset_array.length == 1)            {                alert("No presets to save");                return;            }                    var preset_obj = {};            preset_obj.presets = preset_array.slice(1, preset_array.length);                    var json_data = JSON.stringify(preset_obj, null, 4);            //$.writeln(json_data);                        var file_path = File.saveDialog("Save presets",  "*.json");            if (file_path)            {                file_path.open("w");                file_path.write(json_data);                file_path.close();            };        }                        var propety_panel = myPanel.add("panel", undefined, "Property");                propety_panel.orientation = "row";                propety_panel.alignment = ["fill","top"];                add_prop_button = propety_panel.add ("button", undefined, "Add selected >");        add_prop_button.alignment = ["left",""];        add_prop_button.onClick = function()        {            var comp = app.project.activeItem;                 if (comp == null) {alert("Select a comp!"); return;}                        var sel_layers = comp.selectedLayers;            if (sel_layers.length < 1) {alert("Nothing is selected!"); return;}                        var sel_properties = comp.selectedProperties;            if (sel_properties.length < 1) {alert("Select a property!"); return;}                        var property_string = sel_properties[0].parentProperty.name;                        for (i = 0; i <sel_properties.length; i++)            {                //$.writeln(i);                property_string += "." + sel_properties[i].name;            }                    //$.writeln(property_string);            prop_edittext.text = property_string;                    }            var prop_edittext = propety_panel.add ("edittext", undefined, "");        prop_edittext.characters = 20;        prop_edittext.minimumSize.width = min_width;        prop_edittext.alignment = ["fill",""];                var replace_panel = myPanel.add("panel", undefined, "Replace");        replace_panel.alignChildren = ["fill",""];        replace_panel.alignment = ["fill","top"];                var replace_0 = replace_editfield(replace_panel, "#0");        var replace_1 = replace_editfield(replace_panel, "#1");        var replace_2 = replace_editfield(replace_panel, "#2");        var replace_3 = replace_editfield(replace_panel, "#3");                var expr_panel = myPanel.add("panel", undefined, "Expression");        expr_panel.alignment = ["fill","fill"];                var copy_ctrl_grp = expr_panel.add("group", undefined);        copy_ctrl_grp.alignment = ["left","top"];        relative_checkbox = copy_ctrl_grp.add ("checkbox", undefined, "Relative");        relative_checkbox.value = true;        add_ctrl_button = copy_ctrl_grp.add ("button", undefined, "Copy controller");        add_ctrl_button.onClick = function()        {            var comp = app.project.activeItem;                 if (comp == null) {alert("Select a comp!"); return;}                        var sel_layers = comp.selectedLayers;            if (sel_layers.length < 1) {alert("Nothing is selected!"); return;}                        var sel_properties = comp.selectedProperties;            if (sel_properties.length < 1) {alert("Select a property!"); return;}            prop_grp_name = sel_properties[0].name            // index 1 will give us the name, 2 the compositing options            prop_name = sel_properties[0].property(1).name                        if (relative_checkbox.value)                var ctrl_string = 'thisComp.layer\\\(\\\"'+sel_layers[0].name+'\\\"\\\).effect\\\(\\\"'+prop_grp_name+'\\\"\\\)\\\(\\\"'+prop_name+'\\\"\\\)';            else                var ctrl_string = 'comp\\\(\\\"'+comp.name+'\\\"\\\).layer\\\(\\\"'+sel_layers[0].name+'\\\"\\\).effect\\\(\\\"'+prop_grp_name+'\\\"\\\)\\\(\\\"'+prop_name+'\\\"\\\)';                            system.callSystem("echo " + ctrl_string + " | pbcopy");        }            expr_to_value_button = copy_ctrl_grp.add ("button", undefined, "Expression to value");        expr_to_value_button.onClick = function()        {            //var property = "Opacity";            var property = prop_edittext.text;                        var comp = app.project.activeItem;            if (comp == null || !(comp instanceof CompItem)) { alert("Select a comp!"); return; }            var sel_layers = comp.selectedLayers;            var num_layers = sel_layers.length;            if (num_layers < 1) { alert('Nothing is selected!'); return;}            try            {                for (i = 0; i <num_layers; i++)                {                    var v = eval("sel_layers[i]."+property+".value");                                        // remove the expression                    eval("sel_layers[i]."+property+".expression = \"\"");                    if (v.length == 2) eval("sel_layers[i]."+property+".setValue(["+v[0]+","+v[1]+"])");                    else if (v.length == 3) eval("sel_layers[i]."+property+".setValue(["+v[0]+","+v[1]+","+v[2]+"])");                    else eval("sel_layers[i]."+property+".setValue("+v+")");                }            }            catch (e)             {                alert("Could not convert expression to value\nMake sure that the specified property is valid!" + e);            }        }                var exp_edittext = expr_panel.add ("edittext", [0, 0, 200, 70], "", {multiline: true, scrolling: true, wantReturn: true});        exp_edittext.alignment = ["fill","fill"];                var button_grp = myPanel.add("group", undefined);        button_grp.alignment = ["fill","bottom"];        button_grp.alignChildren = ["fill",""];                remove_exp_button = button_grp.add ("button", undefined, "Remove expression");        remove_exp_button.minimumSize.width = min_width;                remove_exp_button.onClick = function()        {            if (!ScriptUI.environment.keyboardState.shiftKey) if (!confirm("Remove expressions from selected layers?")) return;                        var comp = app.project.activeItem;            if (comp == null || !(comp instanceof CompItem)) { alert("Select a comp!"); return; }                        var property_string = prop_edittext.text;            var property_array = property_string.split(".");            var sel_layers = comp.selectedLayers;            for (i = 0; i < sel_layers.length; i++)            {                error_layer = build_eval_string(sel_layers[i], property_array, "");            }        }                add_exp_button = button_grp.add ("button", undefined, "Add expression");        add_exp_button.minimumSize.width = min_width;        add_exp_button.onClick = function()        {                        var comp = app.project.activeItem;            if (comp == null || !(comp instanceof CompItem)) { alert("Select a comp!"); return; }                        var exp_raw_text = exp_edittext.text;            var property_string = prop_edittext.text;            var property_array = property_string.split(".");            var sel_layers = comp.selectedLayers;            var num_layers = sel_layers.length;                        if (num_layers < 1) { alert('Nothing is selected!'); return;}                                    var error_array = [];                        for (i = 0; i <num_layers; i++)            {                // avoid divide by 0                var t = num_layers == 1 ? 0 : i/(num_layers-1);                                                var exp = replaceAll("\n", "\\n", exp_raw_text);                exp = replaceAll("”", "\"", exp);                exp = replaceAll("“", "\"", exp);                exp = replaceAll("\\\(", "\\\(", exp);                exp = replaceAll("\\\)", "\\\)", exp);                exp = replaceAll("\"", "\\\"", exp);                                if (replace_0.text.length>0) exp = replaceAll("#0", eval(replaceAll("#t", t,replaceAll("#i", i, replace_0.text))), exp);                if (replace_1.text.length>0) exp = replaceAll("#1", eval(replaceAll("#t", t,replaceAll("#i", i, replace_1.text))), exp);                if (replace_2.text.length>0) exp = replaceAll("#2", eval(replaceAll("#t", t,replaceAll("#i", i, replace_2.text))), exp);                if (replace_3.text.length>0) exp = replaceAll("#3", eval(replaceAll("#t", t,replaceAll("#i", i, replace_3.text))), exp);                                error_layer = build_eval_string(sel_layers[i], property_array, exp)                                 if (error_layer  != null) error_array.push(error_layer)            }                        if (error_array.length > 0)            {                alert("Could not add expression to "+error_array.length+" layer(s)\nMake sure the specified properties exists");            }        }                // add the reset "preset"        // (name, property, expression, r0, r1, r2, r3)        addPreset("Reset", "", "", "", "", "", "");                        //Setup panel sizing and make panel resizable        myPanel.layout.layout(true);        myPanel.layout.resize();        myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}        return myPanel;    }    var myScriptPal = myScript_buildUI(thisObj);     if ((myScriptPal != null) && (myScriptPal instanceof Window))    {        myScriptPal.center();        myScriptPal.show();    }}      myScript(this);