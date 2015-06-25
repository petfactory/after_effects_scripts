{
   //var QTtemplate = "Alpha Only";
   var activeItem = app.project.activeItem;
   
   if (activeItem != null && activeItem instanceof CompItem)
   {
      
    var fps = 25.0;
    var start_frame = 37; 
    var duration = 1;
    var start_time = start_frame/fps;
    var duration_time = duration/fps;
    var new_path = "/Users/johan/Desktop/test_afx"
    var ext = "png";
    var padding = "[####]";
    var file_name = "Hello_world";
    var file_path = file_name+"_"+start_frame+"."+padding+"."+ext;

    var render_item = app.project.renderQueue.items.add(activeItem);
     
    var my_renderSettings = {
    "Color Depth":"8 bits per channel",
    "Quality":"Best",
    "Effects":"All On",
    "Time Span Duration":duration_time,
    "Time Span Start":start_time,
    };
    
    render_item.setSettings(my_renderSettings);
    render_item.outputModule(1).applyTemplate("PNG 8 bit premult");
        
    var new_data = {
        "Output File Info":
        {
            "Format": "PNG Sequence",
        "Base Path":new_path,
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
    
   } else {
      alert("Select the comp you want to render first");
   }
}