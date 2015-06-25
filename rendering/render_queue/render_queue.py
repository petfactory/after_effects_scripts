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

function add_to_render_queue(comp, start_frame, end_frame)
{
    var fps = 25.0;
    //var start_frame = 37; 
    //var end_frame = 38; 
    var duration = end_frame - start_frame;
    var start_time = start_frame/fps;
    var duration_time = duration/fps;

    var dir_path = "/Users/johan/Desktop/test_afx"
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
    render_item.outputModule(1).applyTemplate("PNG 8 bit premult");
        
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

comp_array = collect_comps();

add_to_render_queue(comp_array[0], 0, 1)
add_to_render_queue(comp_array[0], 25, 26)

add_to_render_queue(comp_array[1], 50, 51)
add_to_render_queue(comp_array[1], 75, 76)