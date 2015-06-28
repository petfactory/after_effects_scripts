﻿if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx,escapable,gap,indent,meta,rep;if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()isSupported = function(file) {    try {        //macs will send a file or a folder through here.  we need to respond true to folder to allow users to navigate through their directory structure        if (file instanceof Folder)            return true;        else            return file.name.match(/\.json/i) != null;    } catch (e) {        alert("Error in isSupported method: " + e);    }}function read_json(start_frame_enum, output_enum){    //var start_frame_enum = 0;    //var output_enum = 0;        var active_item = app.project.activeItem;        if (active_item == null )    {        alert('Select a comp')        return    }    var file = File.openDialog("Open File", isSupported, false) ;    //var file = File("/Users/johan/Desktop/pos2.json");        if (file)    {        if (file.open("r"))        {            file.encoding = "UTF-8";            var json = file.read();            json_obj = JSON.parse(json)            file.close()            var fps = json_obj.info.fps;            var height = json_obj.info.height;            var frame_start = json_obj.info.frame_start;            var frame_end = json_obj.info.frame_end;            var frame_range = frame_end - frame_start;            var duration = frame_range/fps;                        switch (start_frame_enum)            {                case 0:                    frame_offset = 0;                    break;                                    case 1:                    frame_offset = frame_start;                    break;                                    case 2:                    frame_offset = active_item.time*fps;                    break;                                    case 3:                    frame_offset = (active_item.time*fps) - frame_range;                    break;                                default:                alert("Not a valid enum value");                return;            }                    var time_offset = frame_offset / fps;                                                null_list = json_obj.null;                        switch (output_enum)            {                case 0:                    json_2d_to_null(null_list, active_item, fps, time_offset, duration, frame_range, height);                    break;                                     case 1:                    json_2d_to_text(null_list, active_item, fps, time_offset, duration, frame_range, height);                    break;                                    case 2:                    json_2d_to_shape(null_list, active_item, fps, time_offset, duration, frame_range, height);                    break;                case 3:                        json_2d_to_polygon(null_list, active_item, fps, time_offset, duration, frame_range, height);                        break;                                        default:                alert("Not a valid enum value");                return;            }             }    }   }function json_2d_to_null(null_list, active_item, fps, time_offset, duration, frame_range, height){    for (var i = 0; i < null_list.length; ++i)    {        obj = null_list[i];                for (name in obj)        {            var my_null = active_item.layers.addNull(duration);             my_null.name = name;            pos = my_null.property("position");            my_null.startTime = time_offset;            x_list = obj[name].x;            y_list = obj[name].y;                        for (var j = 0; j < frame_range; ++j)            {                var time = (j+frame_offset) /  fps;                // note that we need to flip the y axis                pos.setValueAtTime(time, [x_list[j], (-y_list[j] + height)]);             }        }                    }}function json_2d_to_text(null_list, active_item, fps, time_offset, duration, frame_range, height){    //$.writeln(active_item, fps)    for (var i = 0; i < null_list.length; ++i)    {        obj = null_list[i];                for (name in obj)        {            // create the text            text = name;            fontSize = 30;            font = "Helvetica";            color = [.3, .3, .3];            tracking = 50;                        var myTextLayer = active_item.layers.addText();            myTextLayer.name = name;            myTextLayer.startTime = time_offset;            myTextLayer.outPoint = time_offset + duration;                                    var textProp = myTextLayer.property("Source Text");                     var textDocument = textProp.value;            textDocument.fillColor = color;            textDocument.applyFill = true;            textDocument.tracking = tracking;            textDocument.resetCharStyle();            textDocument.fontSize = fontSize;            textDocument.fillColor = color;            textDocument.font = font;            textDocument.text = text;            textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;            textProp.setValue(textDocument);            myTextLayer.property("Source Text").setValue(textDocument);                        pos = myTextLayer.property("position");                        x_list = obj[name].x;            y_list = obj[name].y;                        for (var j = 0; j < frame_range; ++j)            {                var time = (j+frame_offset) /  fps;                // note that we need to flip the y axis                pos.setValueAtTime(time, [x_list[j], (-y_list[j] + height)]);              }        }                    }}function json_2d_to_shape(null_list, active_item, fps, time_offset, duration, frame_range, height){    if (null_list.length % 2 != 0)    {        alert("Make sure that the JSON have an even amount of 2d positions. (2, 4, 6...)")        return    }            for (var i = 0; i < null_list.length/2; ++i)    {        obj1 = null_list[i*2];         obj2 = null_list[i*2+1];         for (name in obj1)        {            var name_1 = name;            x1_list = obj1[name].x;            y1_list = obj1[name].y;        }            for (name in obj2)        {            var name_2 = name;            x2_list = obj2[name].x;            y2_list = obj2[name].y;        }                // create the shape        var shape = new Shape();        shape.vertices = [[0,0], [0,0]];        shape.inTangents = []        shape.outTangents = []        shape.closed = false;                 var layer = active_item.layers.addShape();        layer.name = name_1+"_"+name_2;        layer.startTime = time_offset;        layer.outPoint = time_offset + duration;                // adds a Group (Empty) to the shape content        var group = layer.content.addProperty("ADBE Vector Group");        var shapeGroup = group.content.addProperty("ADBE Vector Shape - Group");         shapeGroup.name = "my shape";                // reset the position to 0,0        layer.property("position").setValue([0,0])                for (var j = 0; j < frame_range; ++j)        {            shape.vertices = [[x1_list[j], (-y1_list[j]+height)], [x2_list[j], (-y2_list[j]+height)]];            shapeGroup.path.setValueAtTime(((j+frame_offset) /  fps), shape);         }            var myStroke = group.property("Contents").addProperty("ADBE Vector Graphic - Stroke");                 myStroke.property("Color").setValue([.3,.3,.3]);        myStroke.property("Stroke Width").setValue([3]);    }}function json_2d_to_polygon(null_list, active_item, fps, time_offset, duration, frame_range, height){    vert_pos_array = [];    for (var i = 0; i < null_list.length; ++i)    {        obj = null_list[i];          for (name in obj)        {            x_array = obj[name].x;            y_array = obj[name].y;                        for (j = 0; j < x_array.length; j++)            {                if (i == 0)                {                    vert_pos_array.push(new Array());                }                                vert_pos_array[j].push(x_array[j], y_array[j]);            }        }    }            vert_num = (vert_pos_array[0].length) / 2;    num_frames = vert_pos_array.length;    var shape = new Shape();    shape.inTangents = []    shape.outTangents = []    shape.closed = true;        // add initial verts    for (var i = 0; i < vert_num; i++) shape.vertices.push([0,0]);    var layer = active_item.layers.addShape();    layer.name = "Polygon";    layer.startTime = time_offset;    layer.outPoint = time_offset + duration;    // adds a Group (Empty) to the shape content    var group = layer.content.addProperty("ADBE Vector Group");    var shapeGroup = group.content.addProperty("ADBE Vector Shape - Group");     shapeGroup.name = "my shape";    // reset the position to 0,0    layer.property("position").setValue([0,0])    for (var i = 0; i < num_frames; i++)    {        temp_array = [];        for (var j = 0; j < vert_num; j++)        {            temp_array.push([vert_pos_array[i][j*2], -vert_pos_array[i][j*2+1]+height]);        }        shape.vertices = temp_array;        shapeGroup.path.setValueAtTime(((i+frame_offset) /  fps), shape);        }    //var myStroke = group.property("Contents").addProperty("ADBE Vector Graphic - Stroke");     //myStroke.property("Color").setValue([1,1,1]);    //myStroke.property("Stroke Width").setValue([3]);    var myFill = group.property("Contents").addProperty("ADBE Vector Graphic - Fill");     myFill.property("Color").setValue([1,1,1]);}//read_json(0,0);/*-----------------------------------------------------------------   UI Panel-----------------------------------------------------------------*/function myScript(thisObj){    function myScript_buildUI(thisObj)    {        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "import 2D JSON", [0, 0, 300, 300]);        var typeDropdown = myPanel.add ("dropdownlist", undefined, ["Null", "Text", "Shape", "Polygon"]);        typeDropdown.selection = 0;        typeDropdown.minimumSize.width = 100;        var startFrameDropdown = myPanel.add ("dropdownlist", undefined, ["At frame 0", "From JSON", "After CTI", "Before CTI"]);        startFrameDropdown.selection = 0;        startFrameDropdown.minimumSize.width = 100;        var ok_btn = myPanel.add ("button", undefined, "Create!");        ok_btn.minimumSize.width = 100;        ok_btn.onClick = function()        {            start_frame_enum = startFrameDropdown.selection.index;            output_enum = typeDropdown.selection.index;            //alert(startFramEnum + " " + typeEnum);            read_json(start_frame_enum, output_enum);        }        //Setup panel sizing and make panel resizable        myPanel.layout.layout(true);        //grp.minimumSize = grp.size;        myPanel.layout.resize();        myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}        return myPanel;    }    var myScriptPal = myScript_buildUI(thisObj);     if ((myScriptPal != null) && (myScriptPal instanceof Window))    {        myScriptPal.center();        myScriptPal.show();    }}      myScript(this);