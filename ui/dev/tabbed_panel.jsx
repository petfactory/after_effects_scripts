var w = new Window ("dialog", "Export XML", undefined, {closeButton: false});
w.alignChildren = "right";
var tpanel = w.add ("tabbedpanel");
tpanel.alignChildren = ["fill", "fill"];
tpanel.preferredSize = [350,300];

var general = tpanel.add ("tab", undefined, "General");
general.alignChildren = "fill";
var g_options = general.add ("panel", undefined, "Options");
g_options.alignChildren = "left";
g_options.dtd_decl = g_options.add ("checkbox", undefined, "Include DTD Declaration");
g_options.view_XML = g_options.add ("checkbox", undefined, "View XML Using: ");
g_options.export_sel = g_options.add ("checkbox", undefined, "Export From Selected Element");
g_options.export_untagged = g_options.add ("checkbox", undefined, "Export Untagged Tables as CALS XML");
g_options.remap = g_options.add ("checkbox", undefined, "Remap Break, Whitespace, and Special Characters");
g_options.xslt = g_options.add ("checkbox", undefined, "Apply XSLT: ");
g_options.add ("statictext", undefined, "Encoding: ");

var images = tpanel.add ("tab", undefined, "Images");
images.alignChildren = "fill";
var img_options = images.add ("panel", undefined, "Image Options");


var buttons = w.add ("group");
//var export_button = buttons.add ("button", undefined, "Export", {name: "ok"});
var export_button = buttons.add ("button", undefined, "Import");

export_button.onClick= function() {alert(tpanel.selection.text)}
buttons.add ("button", undefined, "Cancel");
w.show ();