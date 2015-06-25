/*
    function collect_comps()
{
    var project = app.project
    num_items = project.numItems;
    var items = project.items;

    var comp_array = [];
    for (var i = 0;  i < num_items; i++)
    {
        if (items[i+1] instanceof CompItem)
        {
            comp_array.push(items[i+1]);
        }
    }
    //$.writeln(comp_array);
    return comp_array
}
*/

function add_to_render_queue(comp, start_frame, end_frame, dir_path, template_string)
{
    var fps = 25.0;
    //var start_frame = 37; 
    //var end_frame = 38; 
    var duration = end_frame - start_frame;
    var start_time = start_frame/fps;
    var duration_time = duration/fps;

    //var dir_path = "/Users/johan/Desktop/test_afx"
    var ext = "png";
    var padding = "[####]";
    //var file_name = "Hello_world";
    var file_name = comp.name;
    var file_path = file_name+"_"+start_frame+"."+padding+"."+ext;

    var render_item = app.project.renderQueue.items.add(comp);
     
    var my_renderSettings = {
    "Color Depth":"8 bits per channel",
    "Quality":"Best",
    "Effects":"All On",
    "Time Span Duration":duration_time,
    "Time Span Start":start_time,
    };

    render_item.setSettings(my_renderSettings);
    //render_item.outputModule(1).applyTemplate("PNG 8 bit premult");
    render_item.outputModule(1).applyTemplate(template_string);
        
    var new_data = {
        "Output File Info":
        {
            "Format": "PNG Sequence",
            "Base Path":dir_path,
            //"Subfolder Path":"draft",
            "File Name":file_path
            }
        };
    
    var om1 = render_item.outputModule(1);
    om1.setSettings(new_data);

    //var rqItem1_all_str = app.project.renderQueue.item(1).getSettings( GetSettingsFormat.STRING );
    // Convert to JSON format so that it is human-readable.
    //var rqItem1_all_str_json = rqItem1_all_str.toSource();
    //$.writeln(rqItem1_all_str_json)


    //var omItem1_all_str= app.project.renderQueue.item(1).outputModule(1).getSettings( GetSettingsFormat.STRING );
    // Convert to JSON format so that it is human-readable.
    //var romItem1_all_str_json = omItem1_all_str.toSource();
    //$.writeln(romItem1_all_str_json)
}

//var comp = app.project.activeItem;
//if (activeItem != null && activeItem instanceof CompItem)

//comp_array = collect_comps();
//add_to_render_queue(comp_array[0], 0, 1)

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
            var comp = app.project.activeItem;
            if (comp == null || !(comp instanceof CompItem))
            {
                alert("Select a comp!")
                return
            }
            
            dir_path = Folder.selectDialog('Select an outpu directory:', null);
            
            if (dir_path == null) return;
            
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
            
            template_string = typeDropdown.selection.text;
                    
            var num_frames = frame_list.length;            
            for (var j = 0; j < num_frames; j++)
            {
                start_frame = frame_list[j];
                end_frame = start_frame + 1;
                add_to_render_queue(comp, start_frame, end_frame, String(dir_path), template_string)
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
