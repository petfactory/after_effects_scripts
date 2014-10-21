/*
    Author: Johan Borgström 
    Date: 2012 04 16
    www.petfactory.se
    
    Instructions: 
    Select the layers you want to move and run the script.
    
*/

{
    var proj = app.project; 
    var comp = proj.activeItem; 
    if(!comp)
    {
        alert("Please select one or more layers");
    }

    var sel_layers= comp.selectedLayers; 
    var num_sel = sel_layers.length;
    
    if (num_sel<1) alert("Please select one or more layers");
    
    var curr_time = comp.time;

    app.beginUndoGroup("pet_move_layers_to_playhead"); 
    
    for (var i=0; i<num_sel; i++)
    {
        sel_layers[i].startTime = curr_time - (sel_layers[i].inPoint - sel_layers[i].startTime);
    } 

    app.endUndoGroup(); 
    
}