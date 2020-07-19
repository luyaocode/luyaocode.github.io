var canvas=document.getElementById('canvas');
    context=canvas.getContext('2d');
    context.font='38pt Arial';
    context.fillStyle='cornflowerblue';
    context.strokeStyle='blue';
    context.fillText('Hello, Canvas',canvas.width/2-150,//文字起始位置横坐标为600/2-150=150，下同
                                 canvas.height/2+15);//文字起始位置纵坐标为300/2+15=165，下同
    context.strokeText('Hello, Canvas',canvas.width/2-150,
                                   canvas.height/2+15);

