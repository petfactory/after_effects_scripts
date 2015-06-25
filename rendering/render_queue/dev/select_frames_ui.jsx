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
        template = typeDropdown.selection.index;
        //alert(frame_list[j]);
        alert(template);
        
    }
}
var myWindow = new Window ("dialog", "Form");
myWindow.orientation = "row";
myWindow.add ("statictext", undefined, "Frames:");

var frame_edittext = myWindow.add ("edittext", undefined, "John");

var template_list = getOutputModuleTemplateNames()
var typeDropdown = myWindow.add ("dropdownlist", undefined, template_list);
typeDropdown.selection = 2;

//myText.active = true;
frame_edittext.characters = 20;
render_button = myWindow.add ("button", undefined, "Render Frames");
render_button.onClick = apa;
myWindow.show ();