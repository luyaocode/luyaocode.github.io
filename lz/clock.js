var canvas=document.getElementById('canvas'),
    context=canvas.getContext('2d'),
    FONT_HEIGHT=15,
    MARGIN=35,
    HAND_TRUNCATION=canvas.width/25,//短截距
    HOUR_HAND_TRUNCATION=canvas.width/10,//长截距
    NUMERAL_SPACING=20,
    RADIUS=canvas.width/2-MARGIN,
    HAND_RADIUS=RADIUS+NUMERAL_SPACING;

//Functions
function drawCircle(){
    context.beginPath();
    context.arc(canvas.width/2,canvas.height/2,RADIUS,0,Math.PI*2,true);
    context.stroke();
}

function drawNumerals(){
    var numerals=[1,2,3,4,5,6,7,8,9,10,11,12],
        angle=0,
        numeralWidth=0;
    numerals.forEach(function(numeral){
        angle=Math.PI/6*(numeral-3);
        numeralWidth=context.measureText(numeral).width;
        context.fillText(numeral,
            canvas.width/2+Math.cos(angle)*(HAND_RADIUS)-numeralWidth/2,
            canvas.height/2+Math.sin(angle)*(HAND_RADIUS)+FONT_HEIGHT/3);
    });
}

function drawCenter(){
    context.beginPath();
    context.arc(canvas.width/2,canvas.height/2,5,0,Math.PI*2,true);
    context.fill();
}

function drawHand(loc,isHour){
    var angle=(Math.PI*2)*(loc/60)-Math.PI/2,//loc=0-60;angle=-pi/2到3pi/2;
        handRadius=isHour?RADIUS-HAND_TRUNCATION-HOUR_HAND_TRUNCATION//时针
                         :RADIUS-HAND_TRUNCATION;//分针||秒针
    context.moveTo(canvas.width/2,canvas.height/2);
    context.lineTo(canvas.width/2+Math.cos(angle)*handRadius,
                       canvas.height/2+Math.sin(angle)*handRadius);
    context.stroke();        
}
//分针/秒针  0                     15             30                    
//          (cos(-pi/2),sin(-pi/2)) (cos0,sin0) （cos(pi/2),sin(pi/2)) 
//          45                    60
//          (cos(pi),sin(pi))     (cos(3*pi/2),sin(3*pi)/2)
//于是，angle=pi*2*(loc/60)-pi/2
//时针是12进制，分针秒针是60进制，12进制化为60进制:loc=5*hour+5*(minute/60)
          
function drawHands(){
    var date=new Date,
        hour=date.getHours();
    hour=hour>12?hour-12:hour;
    drawHand(hour*5+(date.getMinutes()/60)*5,true,0.5);//时针0.5是什么意思？
    drawHand(date.getMinutes(),false,0.5);//分针
    drawHand(date.getSeconds(),false,0.2);//秒针
}

function drawClock(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawCircle();
    drawCenter();
    drawHands();
    drawNumerals();
}

//initialization
context.font=FONT_HEIGHT+'px Arial';
loop=setInterval(drawClock,1000);
    