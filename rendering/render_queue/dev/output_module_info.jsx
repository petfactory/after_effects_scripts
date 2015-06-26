function add_to_render_queue(comp, start_frame, end_frame)
{
    var fps = 25.0;
    var duration = end_frame - start_frame;
    var start_time = start_frame/fps;
    var duration_time = duration/fps;
    var padding = "[####]";
    var name = comp.name;
    var render_item = app.project.renderQueue.items.add(comp);
  
    render_item.outputModule(1).applyTemplate("PNG 8 bit premult");
    
    // a hack just to get to the extension, is this really the only way... ?
    var output_module_settings = app.project.renderQueue.item(1).outputModule(1).getSettings( GetSettingsFormat.STRING );
    var file_name = output_module_settings["Output File Info"]["File Name"];
    var file_name_split = file_name.split(".");
    var ext = file_name_split[file_name_split.length-1];
    
    // Convert to JSON format so that it is human-readable.
    //var output_module_settings_json = output_module_settings.toSource();
    //$.writeln(output_module_settings_json)
    //for (x in output_module_settings)
    //{
        //$.writeln(x)
        //for (y in x){$.writeln(y)}
    //}
    
        var new_data = {
        "Output File Info":
        {
            "Base Path":"/Users/johan/Desktop",
            "File Name":name+"."+padding+"."+ext
            }
        };
    
    var om1 = render_item.outputModule(1);
    om1.setSettings(new_data);
}

var comp = app.project.activeItem;

add_to_render_queue(comp, 1,2,)