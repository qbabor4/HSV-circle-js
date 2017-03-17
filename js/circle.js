
var circleImage = $("#hsvCircleImage");
var circleRadius = circleImage.width()/2; 
var HSVhue = 0;
var HSVsaturation = 0;
var HSVvalue = 0;

circleImage.on("click", function(e) {
    var mousePos = getMousePos( $(this)[0], e ); 
    
    //console.log(mousePos.x, mousePos.y);
    var distance = getDistanceFromCenter(mousePos.x, mousePos.y);
    var saturation = getSaturation( distance ); // float
    //console.log( saturation );
    var angle = getAngle(mousePos.x, mousePos.y);
    //console.log(angle);
    if ( saturation <= 1) {
        HSVsaturation = saturation;
        HSVhue = angle;
    }
    changeHTMLoutput();
    console.log(HSVhue, HSVsaturation, HSVvalue);
});

function getDistanceFromCenter(mouseX, mouseY){
    var middleX = circleRadius;
    var middleY = circleRadius;
    var triangleBase = Math.abs(middleX - mouseX);
    var triangleHeight = Math.abs(middleY - mouseY);
    var triangleDiagonal = Math.sqrt(triangleBase * triangleBase + triangleHeight * triangleHeight);  
    return triangleDiagonal;
}

function getSaturation( distance ){
    var saturation = ( distance / circleRadius );
    return saturation;   
}

function getMousePos( element, e ) {
    var rect = element.getBoundingClientRect(); // pozycja x,y lewego,gornego wierzchołka i pozycje na ekranie boków   
    return {
        x: Math.round(( e.clientX - rect.left )/( rect.right - rect.left ) * rect.width ),
        y: Math.round(( e.clientY - rect.top )/( rect.bottom - rect.top ) * rect.height )  
    }
}

function getAngle(mouseX, mouseY){
    var angle = Math.abs(( Math.atan2( mouseY - circleRadius, circleRadius - mouseX ) ) * 180 / 3.14 - 180);
    angle = parseInt((angle + 90) % 360) ;
    return angle;
}

function changeHTMLoutput(){
    $("#hue").text(HSVhue);
    $("#saturation").text(HSVsaturation);
    $("#value").text(HSVvalue);
}

$("#HSVvalueInput").on("change", function() {
    HSVvalue = HSVvalueInput.value;
    changeHTMLoutput();
});

// dodac przesówak od 0 do 1 dla v
// zamiana na rgb 