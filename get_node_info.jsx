// minified json: https://github.com/douglascrockford/JSON-js/blob/master/json2.js
if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx,escapable,gap,indent,meta,rep;if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()

var proj = app.project; 
var comp = proj.activeItem; 
var sel_layers = comp.selectedLayers;
var num_sel = sel_layers.length

var fps = comp.frameRate;
var width = comp.width;
var height = comp.height;
var start_frame = 0;
var end_frame = 5;
var time_step = 1.0/fps

// the null nodes that are valid to export i.e. 3D AVLayer
var null_nodes = new Array();
// the null transformation info
var null_trans_array = new Array();

// camera nodes to export
var cam_nodes = new Array();
// the cam transformation info
var cam_trans_array = new Array();

// gather the nodes we want to export
for (var i = 0; i < num_sel; i++)
{
    // export 3D AVLayes
    if (sel_layers[i] instanceof AVLayer  && sel_layers[i].threeDLayer)
    {
        null_nodes.push(sel_layers[i]);
        null_trans_array.push(new Array());
    }
    
    // and cameras
    else if (sel_layers[i] instanceof CameraLayer)
    {
        cam_nodes.push(sel_layers[i]);
        cam_trans_array.push(new Array());
    }
}   

// get the values over the desired period
// we store the transformation of the null and cameras in "parallell" arrays
// they are later to be associated with respective node/camera
var time;
for (var i = start_frame; i < end_frame+1; i++)
{
    time = time_step * i;
    //$.writeln(time)
    for (var j = 0; j < null_nodes.length; j++)
    {
        var pos = null_nodes[j].property("position").valueAtTime(time, false);
        null_trans_array[j].push(pos[0]);
    }

    for (var k = 0; k < cam_nodes.length; k++)
    {
        var pos = cam_nodes[k].property("position").valueAtTime(time, false);
        cam_trans_array[k].push(pos[0]);
    }
}

// the arrays that will hold null/camera info objects, will be assigned to the return object
var null_list = new Array();
var cam_list = new Array();

// create null info objects, key > value pairs obj["name"] = [0,1,2...]
// the node name will be the key of the tarnsformation array
for (var i = 0; i < null_nodes.length; i++)
{
    null_obj = {};
    null_info = {};
    null_obj[null_nodes[i].name] = null_info;
    null_info["matrix"] = null_trans_array[i];
    null_list.push(null_obj);
}

for (var i = 0; i < cam_nodes.length; i++)
{
    cam_obj = {};
    cam_info = {};
    cam_obj[cam_nodes[i].name] = cam_info;
    cam_info["matrix"] = cam_trans_array[i];
    cam_info["zoom"] = cam_nodes[i].property("zoom").value
    cam_list.push(cam_obj);
}

// create the return object and bind the info
var ret_obj = {};

// the info object
var info = {};
info.fps = fps;
info.height = height;
info.width = width;

ret_obj.info = info;
ret_obj.null = null_list;
ret_obj.camera = cam_list;

json = JSON.stringify(ret_obj, null, 4)
$.writeln(json);

/*
// Get the text file to use; and read the lines of text
var file = File.saveDialog("Select a text file", "HAHA, *.json");
    
if (file != null)
{
    file.open("w");
    file.writeln(json);
    file.close();
}
*/