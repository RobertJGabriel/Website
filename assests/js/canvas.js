window.onload = function () {


canvas();
    
};








/*  Stores the varables */

var paint = false;
var canvas;
var cntxt;
var canvastop;
var left;
var fill;
var thickness;
var colors;
var canvas;
var context;
var temp;
var searches = "";
var numItems;


/* when mouse is pressed down */

function doMouseDown(event) {
    paint = true;
    x = event.clientX;
    y = event.layerY;

    cntxt.moveTo(x - left, y - canvastop);
    cntxt.beginPath();
    cntxt.stroke();
}

/* when mouse is pressed up */

function doMouseUp(event) {
    paint = false;
    x = event.clientX;
    y = event.clientY;

    cntxt.lineTo(x - left + 1, y - canvastop + 1);
    cntxt.stroke();
    cntxt.closePath();
}

/* when mouse is pressed moved */

function doMouseMove(event) {
    fill = document.getElementById('fill').value;
    thickness = document.getElementById('width2').value;
    colors = document.getElementById('colors').value;
    cntxt = canvas.getContext("2d");
    cntxt.strokeStyle = colors;
    cntxt.lineWidth = thickness;
    cntxt.lineCap = 'round';

    rect = canvas.getBoundingClientRect();
    canvastop = rect.top;
    left = rect.left;

    if (paint) {
        x = event.clientX;
        y = event.clientY;
        cntxt.lineTo(x - left, y - canvastop);
        cntxt.stroke();
        isKeyPressed(event);
    }
}



/* 
    Downloads the canvas in a new window
    Will work in firefox locally but not chrome
*/

function downloadCanvas() {
    var d = canvas.toDataURL("image/png");
    window.open(canvas.toDataURL('image/png'));
}

/* This is for when the shift key is pressed and draws the cricle to the users movement */

function isKeyPressed(event) {
    if (event.shiftKey == 1) {
        var fill = document.getElementById('fill').value;
        var thickness = document.getElementById('width2').value;
        var colors = document.getElementById('colors').value;
        
        //draws a line with fills the path
          cntxt.lineWidth = 5;
          cntxt.fillStyle = fill;
          cntxt.strokeStyle = colors;
          cntxt.lineTo(x - findPos(canvas)[0], y - findPos(canvas)[1]);
          cntxt.fill();
          cntxt.stroke();
    }
}



function findPos(obj) {
    //finds mouse coordinates relatively to canvas begin (0,0) 
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curleft, curtop];
    }
}




/*
Loads the canvas information to the left and right panel
Theres alot here sorry
*/
function canvas() {
      
    var leftDiv = document.getElementById('left');
    var rightDiv = document.getElementById('right');

    var Div = document.createElement('div');
        Div.setAttribute('id', 'menu');
        leftDiv.appendChild(Div);

    var menuDiv = document.getElementById('menu');


    var lineH2 = document.createElement('h2');
        lineH2.innerHTML = "Line";
        menuDiv.appendChild(lineH2);

    var lineWidth = document.createElement('select');
        lineWidth.setAttribute("id", "width2");
        lineWidth.setAttribute("class","form-control");

    var value = ["4", "10", "15"];
    var text = ["Light", "Middle", "Thick"];

    for (var i = 0; i < text.length; i++) {
        var options = document.createElement('option');
            options.setAttribute("value", value[i]);
            options.innerHTML = text[i];
            lineWidth.appendChild(options);
    }

    menuDiv.appendChild(lineWidth);

    
    var colorH2 = document.createElement('h2');
        colorH2.innerHTML = "Colors";
        menuDiv.appendChild(colorH2);

    var lineWidth2 = document.createElement('select');
        lineWidth2.setAttribute("id", "colors");
       lineWidth2.setAttribute("class","form-control");
    var value1 = ["#000000", "#e74c3c", "#2980b9", "#2ecc71", "#d35400", "#8e44ad", "#ecf0f1"];
    var text1 = ["Black", "Red", "Blue", "Green", "Orange", "Purple", "White"];

    for (var i = 0; i < text1.length; i++) {
        var optionss = document.createElement('option');
            optionss.setAttribute("value", value1[i]);
            optionss.innerHTML = text1[i];
            lineWidth2.appendChild(optionss);
    }
    menuDiv.appendChild(lineWidth2);


    var colorH2 = document.createElement('h2');
        colorH2.innerHTML = "Fill";
        menuDiv.appendChild(colorH2);


    var lineWidth3 = document.createElement('select');
        lineWidth3.setAttribute("id", "fill");
           lineWidth3.setAttribute("class","form-control");

    for (var i = 0; i < text1.length; i++) {
        var options = document.createElement('option');
            options.setAttribute("value", value1[i]);
            options.innerHTML = text1[i];
            lineWidth3.appendChild(options);
    }
    menuDiv.appendChild(lineWidth3);

    
    
       var options = document.createElement('h2');
        options.innerHTML = "Options";
        menuDiv.appendChild(options);
    
     var downloadButton = document.createElement('button');
        downloadButton.setAttribute('id', 'download');
        downloadButton.setAttribute('class', 'btn btn-primary');
        downloadButton.innerHTML = "Save";
        menuDiv.appendChild(downloadButton);

    var clearButton = document.createElement('button');
        clearButton.setAttribute('id', 'clear');
        clearButton.setAttribute('class', 'btn btn-danger');
        clearButton.innerHTML = "Clear";
        menuDiv.appendChild(clearButton);
    
    
    
    
    
    
    var newCanvas = document.createElement('canvas');
             newCanvas.width =  rightDiv.clientWidth- 50;
        newCanvas.height = window.innerHeight;
        newCanvas.setAttribute("id", "canvas_1");
        document.getElementById("right").appendChild(newCanvas);
    
    var tipTitle = document.createElement('h4');
        tipTitle.innerHTML = "Tip";
        menuDiv.appendChild(tipTitle);
    
    
    
    
     var tipMain = document.createElement('p');
        tipMain.innerHTML = "Hold Ctrl and drag the mouse to draw a cicrle :-O";
        menuDiv.appendChild(tipMain);
    
    
    
    
    
    
    
        canvas = document.getElementById("canvas_1");
        canvas.addEventListener("mousedown", doMouseDown, false);
        canvas.addEventListener("mouseup", doMouseUp, false);
        canvas.addEventListener("mousemove", doMouseMove, false);
        document.getElementById("clear").addEventListener('click', cleanStart, false);
        document.getElementById("download").addEventListener('click', downloadCanvas, false);
        
    
 cleanStart() ;
    
}




function cleanStart() {

   var canvas = document.getElementById('canvas_1');
   var  cntxt = canvas.getContext('2d');
   var imageObj = new Image();
 cntxt.clearRect(0, 0, canvas.width, canvas.height);

       
  
}



