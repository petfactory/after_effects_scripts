var proj = app.project;
var comp = proj.activeItem;
var sel_list = comp.selectedLayers;
var cam = sel_list[0];

var width = comp.width;
var height = comp.height;

var pixel_aspect = comp.pixelAspect;
var fb = width / height;

//$.writeln(cam.cameraOption)
//$.writeln(cam.transform.xRotation.value);
//$.writeln(cam.transform.position.value);

var zoom = cam.cameraOption.zoom.value;
var h_fov = Math.atan((width*.5)/zoom) * 2;

// assuming mm
var h_aperture_mm = 36.0
var v_aperture_mm = 24.0

focal_length = (h_aperture_mm*.5) / Math.tan(h_fov*.5)
$.writeln(focal_length);

//$.writeln(focal_length);
/*
 Maya cam
angle of view: 54.43
focal length:  35.000 
 */

/*
for(x in cam.cameraOption)
{
    $.writeln(x)
}
*/