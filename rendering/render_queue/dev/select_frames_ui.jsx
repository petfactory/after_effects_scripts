function getOutputModuleTemplateNames()  
{  
      var currentOMName;  
      var OMStringsPrefSection = "Output Module Spec Strings Section v28";  
      var OMStringsKeyPrefix = "Output Module Spec Strings Name ";  
      var hiddenPrefixRE = /_HIDDEN/;  
      var OMList = new Array();  
      for(var i = 0; app.preferences.havePref(OMStringsPrefSection, OMStringsKeyPrefix+i, PREFType.PREF_Type_MACHINE_INDEPENDENT_OUTPUT); i++)  
      {  
        currentOMName = app.preferences.getPrefAsString(OMStringsPrefSection, OMStringsKeyPrefix+i, PREFType.PREF_Type_MACHINE_INDEPENDENT_OUTPUT);  
        if(currentOMName.match(hiddenPrefixRE)==null) OMList.push(currentOMName);  
      }  
      return OMList;  
}

function set_dir()
{
    dir = Folder.selectDialog('Please select the folder to be imported:', Folder('~/Documents/projects/the_bot/bot_illustrator/'));

    if (dir)
    {
        dir_edittext.text = dir;
    }
}

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
    
    template_name = typeDropdown.selection.text;
    
    var num_frames = frame_list.length;
    for (var j = 0; j < num_frames; j++)
    {
        //$.writeln(frame_list[j]);
        //alert(frame_list[j]);
        start_frame = frame_list[j];
        alert(template_name + " - " + start_frame + " - " + dir_edittext.text);
        
    }
}
var myWindow = new Window ("dialog", "Form");
myWindow.orientation = "column";
myWindow.add ("statictext", undefined, "Frames:");

var frame_edittext = myWindow.add ("edittext", undefined, "0, 25, 50");
//myText.active = true;
frame_edittext.characters = 20;

var dir_edittext = myWindow.add ("edittext", undefined, "Directory");
 dir_edittext.active = false;
dir_edittext.characters = 20;

var set_dir_button = myWindow.add ("button", undefined, "Set Directory");
set_dir_button.onClick = set_dir;

var template_list = getOutputModuleTemplateNames()
var typeDropdown = myWindow.add ("dropdownlist", undefined, template_list);
typeDropdown.selection = 2;


render_button = myWindow.add ("button", undefined, "Render Frames");
render_button.onClick = apa;

myWindow.show ();



