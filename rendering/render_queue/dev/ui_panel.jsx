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

/*
-----------------------------------------------------------------
   UI Panel
-----------------------------------------------------------------
*/

function myScript(thisObj)
{
    function myScript_buildUI(thisObj)
    {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "import 2D JSON", [0, 0, 300, 300]);

        myPanel.add ("statictext", undefined, "Frames:");

        var frame_edittext = myPanel.add ("edittext", undefined, "0, 25, 50");
        frame_edittext.active = true;
        frame_edittext.characters = 20;

        var template_list = getOutputModuleTemplateNames()
        var typeDropdown = myPanel.add ("dropdownlist", undefined, template_list);
        typeDropdown.selection = 2;

        render_button = myPanel.add ("button", undefined, "Render Frames");
        render_button.onClick = function()
        {
            dir = Folder.selectDialog('Please select the folder to be imported:', Folder('~/Documents/projects/the_bot/bot_illustrator/'));
            if (dir == null) return;
            
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
                start_frame = frame_list[j];
                var a = template_name + " - " + start_frame + " - " + dir.name;                
            }
        } // end render button callback

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
