{
function myScript(thisObj) {
    
          function myScript_buildUI(thisObj) {
              
                    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "import 2D JSON", [0, 0, 300, 300]);

                    var typeDropdown = myPanel.add ("dropdownlist", undefined, ["Null", "Shape", "Text"]);
                    typeDropdown.selection = 0;
                    getInfo(typeDropdown)
                    typeDropdown.minimumSize.width = 100;
                    
                    var startFrameDropdown = myPanel.add ("dropdownlist", undefined, ["After CTI", "Before CTI", "At frame 0", "From JSON"]);
                    startFrameDropdown.selection = 0;
                    startFrameDropdown.minimumSize.width = 100;

                    var ok_btn = myPanel.add ("button", undefined, "Create!");
                    ok_btn.minimumSize.width = 100;

                    ok_btn.onClick = function()
                    {
                        startFramEnum = startFrameDropdown.selection.index;
                        typeEnum = typeDropdown.selection.index;
                        alert(startFramEnum + " " + typeEnum);
                    }
 
                    //Setup panel sizing and make panel resizable
                    myPanel.layout.layout(true);
                    grp.minimumSize = grp.size;
                    myPanel.layout.resize();
                    myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}

                    return myPanel;
          }

          var myScriptPal = myScript_buildUI(thisObj);
 
          if ((myScriptPal != null) && (myScriptPal instanceof Window)) {
                    myScriptPal.center();
                    myScriptPal.show();
                    //getInfo(myScriptPal);
                    
                    }
          }
      
    myScript(this);
}