const guardElement = document.querySelector('.guard');
const guardVelocity = 50;

setInterval(() => {
    const guardPosition = {
        x: guardElement.offsetLeft,
        y: guardElement.offsetTop,
    };

    guardPosition.x = updatePosition(guardPosition.x, guardElement.offsetWidth, document.body.offsetWidth);
    guardPosition.y = updatePosition(guardPosition.y, guardElement.offsetHeight, document.body.offsetHeight);

    guardElement.style.top = guardPosition.y + 'px';
    guardElement.style.left = guardPosition.x + 'px';
}, 500);

const updatePosition = (currentPosition, size, containerSize) => {
    const direction = random(3);

    if(direction === 0){
        currentPosition -= guardVelocity;
    }else if(direction === 2){
        currentPosition += guardVelocity;
    }

    if(currentPosition < 0){
        currentPosition = 0;
    }else if(currentPosition + size > containerSize){
        currentPosition = containerSize - size;
    }

    return currentPosition;
};

const random = (max) => {
    return Math.floor(Math.random() * max);
};