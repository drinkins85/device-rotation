const con = document.querySelector('.console');
const button = document.querySelector('.accessButton');
const target = document.querySelector('.target');
const { deviceRotation } = window;

target.style.left = `${(window.innerWidth / 2) - 10}px`;
target.style.top = `${(window.innerHeight / 2) - 10}px`;

function moveElem(elem, direction, value, limit) {
    const currentPos = parseInt(elem.style[direction], 10) || 0;
    const newPos = currentPos + value;
    limit = limit || { max: 0, min: 0 };

    if (value > 0) {
        elem.style[direction] = `${Math.min(newPos, limit.max)}px`;
    }

    if (value < 0) {
        elem.style[direction] = `${Math.max(newPos, limit.min)}px`;
    }
}

function cb(params, elem) {
    con.innerHTML = `${params.x} : ${params.y}`;

    if (!elem) {
        return;
    }

    if (Math.abs(params.x) > 5) {
        moveElem(elem, 'left', Math.floor(params.x / 3), {
            min: 0,
            max: window.innerWidth - 20,
        });
    }

    if (Math.abs(params.y) > 5) {
        moveElem(elem, 'top', Math.floor(params.y / 3), {
            min: 0,
            max: window.innerHeight - 20,
        });
    }
}

deviceRotation.setCallback(cb, target);
deviceRotation.setOffset(0, -30);

if (deviceRotation.isAvailable()) {
    if (deviceRotation.needPermission()) {
        button.style.display = 'block';
        button.onclick = function () {
            deviceRotation.start({ withPermission: true });
        };
    } else {
        deviceRotation.start();
    }
} else {
    // eslint-disable-next-line no-console
    console.error('Device Rotation is unavailable');
}
