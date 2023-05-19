/**
 * 鼠标点击特效
 */
function clickEffect() {
    let balls = [];
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    // 鼠标点击时的坐标,也就是小球生成处的坐标
    let origin;
    let normal;
    let ctx;
    // 颜色数组
    const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
    // canvas 元素
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    // 设置canvas样式
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    const pointer = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);
 
    if (canvas.getContext && window.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize();
        // 浏览器窗口尺寸自适应
        window.addEventListener('resize', updateSize, false);
        // 调用循环
        loop();
        // 鼠标事件
        // 当鼠标指针移动到元素上方，并按下鼠标按键（左、右键均可）时，会发生 mousedown 事件。
        // 与 click 事件不同，mousedown 事件仅需要按键被按下，而不需要松开即可发生。
        window.addEventListener("mousedown", function(e) {
            // 鼠标点击,放入10~20个球
            pushBalls(randBetween(10, 20), e.clientX, e.clientY);
            document.body.classList.add("is-pressed");
            longPress = setTimeout(function() {
                document.body.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }, false);
        // 当在元素上松开鼠标按键（左、右键均可）时，会发生 mouseup 事件。
        // 与 click 事件不同，mouseup 事件仅需要松开按钮。当鼠标指针位于元素上方时，放松鼠标按钮就会触发该事件。
        window.addEventListener("mouseup", function(e) {
            clearInterval(longPress);
            if (longPressed == true) {
                document.body.classList.remove("is-longpress");
                // 长按的话,松开鼠标,放入50+个球
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
                longPressed = false;
            }
            document.body.classList.remove("is-pressed");
        }, false);
        // 鼠标移动事件
        window.addEventListener("mousemove", function(e) {
            let x = e.clientX;
            let y = e.clientY;
            pointer.style.top = y + "px";
            pointer.style.left = x + "px";
        }, false);
    } else {
        console.log("canvas or addEventListener is unsupported!");
    }
 
 
    // 窗口尺寸改变
    function updateSize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(2, 2);
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
        origin = {
            x: width / 2,
            y: height / 2
        };
        normal = {
            x: width / 2,
            y: height / 2
        };
    }
    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            // 角度，介于-2PI到2PI
            this.angle = Math.PI * 2 * Math.random();
            if (longPressed == true) {
                // 长按，multiplier介于14~15
                this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
            } else {
                // 点按,multiplier介于6~12
                this.multiplier = randBetween(6, 12);
            }
            // x轴速度
            this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
            // y轴速度
            this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
            // 圆半径
            this.r = randBetween(12, 20) + 3 * Math.random();
            // Math.floor(x)向下取整，设置颜色
            this.color = colours[Math.floor(Math.random() * colours.length)];

            // 画爱心
            this.vertices=[];
            // console.log(this == win) //true　
            for(let i = 0; i < 50; i++) {
                let step = i/50 * (Math.PI * 2);
                let vector = {
                    x : 1*(16 * Math.pow(Math.sin(step), 3)),
                    y : 1*(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
                }
                this.vertices.push(vector);
            }
        }
        update() {
            this.x += this.vx - normal.x;
            this.y += this.vy - normal.y;
            normal.x = -4 / window.innerWidth * Math.sin(this.angle);
            normal.y = -4 / window.innerHeight * Math.cos(this.angle);
            // 半径衰减
            this.r -= 0.5;
            // x轴速度衰减
            this.vx *= 0.9;
            // y轴速度衰减
            this.vy *= 0.9;
        }
    }
 
    // count:放多少个球
    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i++) {
            balls.push(new Ball(x, y));
        }
    }
 
    // 返回min和max之间的某个值
    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
 
    function loop() {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.r < 0) continue;
            ctx.fillStyle = b.color;
            ctx.beginPath();
            // 圆心坐标,半径,起始,终点圆弧角,false-顺时针
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            ctx.fill();
            b.update();
        }
        if (longPressed == true) {
            multiplier += 0.2;
        } else if (!longPressed && multiplier >= 0) {
            multiplier -= 0.4;
        }
        removeBall();
        
        // 循环动画
        requestAnimationFrame(loop);
    }
 
    // 移除小球
    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
                balls.splice(i, 1);
            }
        }
    }
}
clickEffect();//调用
 