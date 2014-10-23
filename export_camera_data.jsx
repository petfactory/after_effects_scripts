// minified json: https://github.com/douglascrockford/JSON-js/blob/master/json2.js
if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx,escapable,gap,indent,meta,rep;if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()

var proj = app.project; 
var comp = proj.activeItem; 

var cam = comp.selectedLayers[0]

var x_null = comp.layers.addNull();
x_null.name = "x_axis"
x_null.threeDLayer = true;

var y_null = comp.layers.addNull();
y_null.name = "y_axis"
y_null.threeDLayer = true;

var z_null = comp.layers.addNull();
z_null.name = "z_axis"
z_null.threeDLayer = true;

var pos_null = comp.layers.addNull();
pos_null.name = "pos_null"
pos_null.threeDLayer = true;

// x axis
var exp_x = "L1 = thisComp.layer(\"" + cam.name+"\");\n";
exp_x += "p = L1.toWorldVec([1,0,0]);\n";

// yaxis
var exp_y = "L1 = thisComp.layer(\"" + cam.name+"\");\n";
exp_y += "p = L1.toWorldVec([0,1,0]);\n";

// z axis
var exp_z = "L1 = thisComp.layer(\"" + cam.name+"\");\n";
exp_z += "p = L1.toWorldVec([0,0,1]);\n";

// pos
var exp_pos = "L1 = thisComp.layer(\"" + cam.name+"\");\n";
exp_pos += "p = L1.toWorld([0,0,0]);\n";

x_null.property("Position").expression = exp_x;
y_null.property("Position").expression = exp_y;
z_null.property("Position").expression = exp_z;
pos_null.property("Position").expression = exp_pos;

fps = 25;
inc = 1.0 / (fps -1)

var obj = {};
var array = new Array();
obj.matrix = array;

for (i = 0; i < fps; i++)
{ 
    var time = inc*i;

    var x = x_null.property("position").valueAtTime(time, false);
    var y = y_null.property("position").valueAtTime(time, false);
    var z = z_null.property("position").valueAtTime(time, false);
    var p = pos_null.property("position").valueAtTime(time, false);
    
    var arr = [x[0],x[1],x[2], y[0],y[1],y[2], z[0],z[1],z[2], p[0],p[1],p[2]]
    array[i] = arr;
    
    //$.writeln(time);
}

json = JSON.stringify(obj, null, 4)
//$.writeln(json);

x_null.remove();
y_null.remove();
z_null.remove();
pos_null.remove();

// Get the text file to use; and read the lines of text
var file = File.saveDialog("Select a text file", "HAHA, *.json");
    
if (file != null)
{
    file.open("w");
    file.writeln(json);
    file.close();
}
 


/*
import pymel.core as pm
import json


read_data = None

with open('/Users/johan/Desktop/anim.json', 'r') as f:
    read_data = f.read()


data = json.loads(read_data)

all_m = data.get('matrix')
m = all_m[12]


tm = pm.datatypes.TransformationMatrix([m[0], m[1], m[2], 0], [m[3], m[4], m[5], 0], [m[6], m[7], m[8], 0], [m[9], m[10], m[11], 1])

c = pm.polyCube()[0]

c.setMatrix(tm)
*/   