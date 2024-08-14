if (!window.matchMedia("(pointer: coarse)").matches) {
    // touchscreen
    const cursorCanvas = document.getElementById("cursor");
    const context = cursorCanvas.getContext('2d');

    // for intro motion
    let mouseMoved = false;

    const pointer = {
        x: .5 * window.innerWidth,
        y: .5 * window.innerHeight,
    }
    const params = {
        pointsNumber: 20,
        widthFactor: 1,
        mouseThreshold: .6,
        spring: .6,
        friction: .4
    };

    const trail = new Array(params.pointsNumber);
    for (let i = 0; i < params.pointsNumber; i++) {
        trail[i] = {
            x: pointer.x,
            y: pointer.y,
            dx: 0,
            dy: 0,
        }
    }
    var color;
    window.addEventListener("mousemove", e => {
        mouseMoved = true;
        updateMousePosition(e.clientX, e.clientY);
        var anchor = e.target.closest('a');
        if (anchor !== null) {
            color = "#EB6E93";
        } else {
            color = "#C4A6E6";
        }
    });

    function updateMousePosition(eX, eY) {
        pointer.x = eX;
        pointer.y = eY;
    }

    setupCanvas();
    update(0);
    window.addEventListener("resize", setupCanvas);


    function update(t) {
        if (!mouseMoved) {
            pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
            pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
        }

        context.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
        trail.forEach((p, pIdx) => {
            const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
            const spring = pIdx === 0 ? .4 * params.spring : params.spring;
            p.dx += (prev.x - p.x) * spring;
            p.dy += (prev.y - p.y) * spring;
            p.dx *= params.friction;
            p.dy *= params.friction;
            p.x += p.dx;
            p.y += p.dy;
        });

        context.lineCap = "round";
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(trail[0].x, trail[0].y);

        for (let i = 1; i < trail.length - 1; i++) {
            const xc = .5 * (trail[i].x + trail[i + 1].x);
            const yc = .5 * (trail[i].y + trail[i + 1].y);
            context.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
            context.lineWidth = params.widthFactor * (params.pointsNumber - i);
            context.stroke();
        }
        context.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
        context.stroke();

        window.requestAnimationFrame(update);
    }

    function setupCanvas() {
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
    }
}