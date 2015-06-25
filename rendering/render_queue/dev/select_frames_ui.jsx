function apa()
{
    var frame_string = frame_edittext.text;
    var frame_split = frame_string.split(",");
    var num_frames = frame_split.length;
    //$.writeln(num_frames);
    
    var frame_list = new Array();
    for (var i = 0; i < num_frames; i++)
    {        
       if (!isNaN (frame_split[i]))
       {
           //$.writeln(frame_split[i])
           var n = frame_split[i]
           frame_list.push(Number(n));
       }
    }
    
    var num_frames = frame_list.length;
    for (var j = 0; j < num_frames; j++)
    {
        //$.writeln(frame_list[j]);
        alert(frame_list[j]);
    }
}
var myWindow = new Window ("dialog", "Form");
myWindow.orientation = "row";
myWindow.add ("statictext", undefined, "Frames:");
var frame_edittext = myWindow.add ("edittext", undefined, "John");
//myText.active = true;
frame_edittext.characters = 20;
render_button = myWindow.add ("button", undefined, "Render Frames");
render_button.onClick = apa;
myWindow.show ();