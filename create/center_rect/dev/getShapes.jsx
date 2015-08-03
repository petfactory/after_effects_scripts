﻿function get_shape_verts(){    var comp = app.project.activeItem;    var shapeLayer = comp.selectedLayers[0];    var ret_list = []     // Iterate over the shape layer's paths, converting them to masks    var shapeContents = shapeLayer.property("ADBE Root Vectors Group");            for (var g=1; g<=shapeContents.numProperties; g++)    {        shapeGroup = shapeContents.property(g);                // Only process groups        if (shapeGroup.matchName !== "ADBE Vector Group")        {            //alert(shapeGroup.matchName)            continue;        }                shape_trans_pos = shapeGroup.property("ADBE Vector Transform Group").property("ADBE Vector Position").value;        shape_trans_anchor = shapeGroup.property("ADBE Vector Transform Group").property("ADBE Vector Anchor").value;        layer_trans_pos = shapeLayer.transform.position.value;        layer_trans_anchor = shapeLayer.transform.anchorPoint.value;                    // Look in each group for shape paths. These will be converted to masks        shapeGroupContents = shapeGroup.property("Contents");                for (var gp=1; gp<=shapeGroupContents.numProperties; gp++)        {            shapeGroupProp = shapeGroupContents.property(gp);            //$.writeln("name: "+shapeGroupProp.name+"\tPos:  "+trans_pos.toString()+"\tAnc: "+ trans_anchor.toString())            if (shapeGroupProp.matchName === "ADBE Vector Shape - Group")            {                try                {                    // Get the shape path info                    shapePath = shapeGroupProp.property("ADBE Vector Shape");                    verts = shapePath.value.vertices;                                        var info = {};                    info.name = shapeGroup.name;                    var temp = [];                    info.verts = temp;                                        for (var v = 0; v < verts.length; v++)                    {                       temp.push([                                            verts[v][0]+layer_trans_pos[0]-layer_trans_anchor[0]+shape_trans_pos[0]-shape_trans_anchor[0],                                            verts[v][1]+layer_trans_pos[1]-layer_trans_anchor[1]+shape_trans_pos[1]-shape_trans_anchor[1]                                        ])                                            }                                        ret_list.push(info);                                    }                catch (e) {}                            }        }    }    return ret_list;}var v = get_shape_verts()var comp = app.project.activeItem;for (var i = 0; i < v.length; i++){    var info = v[i]    var name = info.name;    var verts = info.verts;        for (var j = 0; j < verts.length; j++)    {        //$.writeln(arr[j])        nu = comp.layers.addNull();        nu.name = name+"_v"+j;        nu.Transform.Position.setValue([verts[j][0], verts[j][1]]);    }}