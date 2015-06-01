if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx,escapable,gap,indent,meta,rep;if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()

/*
function import_pos_2d()
{
    var active_item = app.project.activeItem;
    if (active_item == null )
    {
        alert('Select a comp')
        return
    }
    
    var use_time_offset = false;
    var start_frame = 20;
    var end_frame = 100;
    var fps = 25;
    var frame_range = end_frame - start_frame;
    var duration = frame_range/fps;
    
    // create a null
    var my_null = active_item.layers.addNull(duration); 
    name = 'myNull';
    my_null.name = name;
    pos = my_null.property("position");
    
    // frame offset
    if (use_time_offset) frame_offset = 20;
    else frame_offset = 0;
    
    
    var time_offset = currentFormatToTime(frame_offset, fps);
    my_null.startTime = time_offset;


    for (var i = 0; i < frame_range; i++)
    {
        var time = currentFormatToTime(i+frame_offset, fps);
        pos.setValueAtTime(time, [time*100, time*100] );
    }
}
*/

//import_pos_2d()

isSupported = function(file) {
    try {
        //macs will send a file or a folder through here.  we need to respond true to folder to allow users to navigate through their directory structure
        if (file instanceof Folder)
            return true;
        else
            return file.name.match(/\.json/i) != null;
    } catch (e) {
        alert("Error in isSupported method: " + e);
    }
}

function read_json()
{
    var active_item = app.project.activeItem;
    
    if (active_item == null )
    {
        alert('Select a comp')
        return
    }


    var file = File.openDialog("Open File", isSupported, false) ;
    //var file = File("/Users/johan/Desktop/pos.json");
    
    if (file)
    {
        if (file.open("r"))
        {
            file.encoding = "UTF-8";
            var json = file.read();
            json_obj = JSON.parse(json)
            file.close()
            
            var fps = json_obj.info.fps;
            var height = json_obj.info.height;
            var frame_start = json_obj.info.frame_start;
            var frame_end = json_obj.info.frame_end;
            var use_time_offset = false;
            var frame_range = frame_end - frame_start;
            var duration = frame_range/fps;

            // frame offset
            if (use_time_offset) frame_offset = frame_start;
            else frame_offset = 0;
    
            var time_offset = currentFormatToTime(frame_offset, fps);
                                    
            null_list = json_obj.null;
            
            $.writeln("Aniamtion has [" + frame_range + "] frames");

            for (var i = 0; i < null_list.length; ++i)
            {
                obj = null_list[i];
                
                for (name in obj)
                {
                    // create a null
                    var my_null = active_item.layers.addNull(duration); 
                    my_null.name = name;
                    pos = my_null.property("position");
                    my_null.startTime = time_offset;
    
                    $.writeln("Creating node: " + name);
                    x_list = obj[name].x;
                    y_list = obj[name].y;
                    
                    for (var j = 0; j < frame_range; ++j)
                    {
                        var time = currentFormatToTime(j+frame_offset, fps);
                        // note that we need to flip the y axis
                        pos.setValueAtTime(time, [x_list[j], (-y_list[j] + height)]);
                        $.writeln("Frame: " + j);
                     }
                }                
            }
         }
    }   
}

read_json();