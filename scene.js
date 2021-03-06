const Player = new Entity(10, 10, 0);
const objects = [];
const raySteps = [];

let populateScene = num => {
    for(let i = 0; i < num; i++) {
        objects.push(new Circle(Math.random() * (canvas.width-60) + 30, Math.random() * (canvas.height-60) + 30, Math.max(Math.random() * 30, 15)))
        objects.push(new Rect(Math.random() * (canvas.width-60) + 30, Math.random() * (canvas.height-60) + 30, Math.max(Math.random() * 30, 15), Math.max(Math.random() * 30, 15)))
    }
}

let addObject = (x, y, type) => {
    if(type == "rect") objects.push(new Rect(Mouse.x, Mouse.y, Math.max(Math.random() * 30, 15), Math.max(Math.random() * 30, 15)));
    if(type == "circle") objects.push(new Circle(Mouse.x, Mouse.y, Math.max(Math.random() * 30, 15)))
}

let recalculateScene = () => {
    raySteps.length = 0;

    //for(let i=0; i < Math.PI*2; i+=Math.PI/128)
        raySteps.push(new Ray(Player.pos, Player.dir));

    let prevP = Player.pos;
    raySteps.length = 0;
    for(let i = 0; i < 100; i++) {
        let R = Math.min(...objects.map(obj => marchToShape(prevP, obj)));
        let newP = Math.distance.circleRay(new Circle(prevP.x, prevP.y, R), Player.dir);
        if(R <= 0.5) {
            raySteps.push(new Circle(newP.x, newP.y, 2, "red"));
            break;
        }
        if(R > 1000) {
            raySteps.push(new Circle(newP.x, newP.y, 10, "yellow"));
            break;
        }
        raySteps.push(new MarchingBall(prevP.x, prevP.y, R, newP.x, newP.y));
        prevP = newP;
    }

    requestAnimationFrame(draw);
}

let drawScene = context => {
    Player.draw(context);
    objects.forEach(object => object.draw(context));
    raySteps.forEach(ray => ray.draw(context, true, true));
}

// display angle relative to the circle
/*
for(let circle of objects) {
    if(circle.type == "rect") continue;
    let rad = Math.atan2(circle.y - Player.y, circle.x - Player.x);

    let K = Math.distance.point2Circle(Player.pos, circle);
    let x = Player.x + Math.cos(rad) * K;
    let y = Player.y + Math.sin(rad) * K;

    context.fillStyle = "green";
    context.fillCircle(x, y, 10, 10)

    drawLine(circle, rad, K);
}
*/

/*
function drawLine(circle, angle, K) {
    let x1 = Player.x;
    let x2 = circle.x;
    let y1 = Player.y;
    let y2 = circle.y;

    context.save();
    context.lineWidth = 1;

    context.strokeStyle = "cyan";
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();

    context.strokeStyle = "yellow";
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y1);
    context.stroke();

    context.strokeStyle = "yellow";
    context.beginPath();
    context.moveTo(x2, y1);
    context.lineTo(x2, y2);
    context.stroke();

    context.strokeStyle = "magenta";
    context.beginPath();
    context.arc(x1, y1, 20, 0, angle)
    context.stroke();

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(x1, y1, Math.abs(K), 0, 2*Math.PI)
    context.stroke();

    context.restore();
}
*/