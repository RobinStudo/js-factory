const containerElement = document.getElementById('game-container');
const guardElements = containerElement.getElementsByClassName('guard');
const playerElement = containerElement.querySelector('.player');
const guardVelocity = 50;
const playerVelocity = 20;

setInterval(() => {
   if(random(3) === 1){
       const guard = document.createElement('div');
       guard.classList.add('guard');
       containerElement.appendChild(guard);
   }
}, 5000);

setInterval(() => {
    for(let guardElement of guardElements){
        const guardPosition = {
            x: guardElement.offsetLeft,
            y: guardElement.offsetTop,
        };

        guardPosition.x = updatePosition(guardPosition.x, guardElement.offsetWidth, document.body.offsetWidth);
        guardPosition.y = updatePosition(guardPosition.y, guardElement.offsetHeight, document.body.offsetHeight);

        guardElement.style.top = guardPosition.y + 'px';
        guardElement.style.left = guardPosition.x + 'px';
    }
}, 500);

document.addEventListener('keydown', e => {
   switch (e.key) {
       case 'z':
       case 'ArrowUp':
            movePlayer(0, -playerVelocity);
           break;
       case 'q':
       case 'ArrowLeft':
            movePlayer(-playerVelocity, 0);
           break;
       case 's':
       case 'ArrowDown':
            movePlayer(0, playerVelocity);
           break;
       case 'd':
       case 'ArrowRight':
            movePlayer(playerVelocity, 0);
           break;
   }
});

const movePlayer = (x, y) => {
    const playerPosition = {
        x: playerElement.offsetLeft,
        y: playerElement.offsetTop,
    };

    playerPosition.x = playerPosition.x + x;
    playerPosition.y = playerPosition.y + y;

    playerPosition.x = limitPositionToContainer(playerPosition.x, playerElement.offsetWidth, containerElement.offsetWidth);
    playerPosition.y = limitPositionToContainer(playerPosition.y, playerElement.offsetHeight, containerElement.offsetHeight);

    playerElement.style.top = playerPosition.y + 'px';
    playerElement.style.left = playerPosition.x + 'px';

    console.log(checkPlayerCollision());
}

const updatePosition = (currentPosition, size, containerSize) => {
    const direction = random(3);

    if(direction === 0){
        currentPosition -= guardVelocity;
    }else if(direction === 2){
        currentPosition += guardVelocity;
    }

    return limitPositionToContainer(currentPosition, size, containerSize);
};

const limitPositionToContainer = (currentPosition, size, containerSize) => {
    if(currentPosition < 0){
        currentPosition = 0;
    }else if(currentPosition + size > containerSize){
        currentPosition = containerSize - size;
    }

    return currentPosition;
};

const checkPlayerCollision = () => {
    const p = {
        top: playerElement.offsetTop,
        left: playerElement.offsetLeft,
        right: playerElement.offsetLeft + playerElement.offsetWidth,
        bottom: playerElement.offsetTop + playerElement.offsetHeight,
    };

    for(let guardElement of guardElements){
        const g = {
            top: guardElement.offsetTop,
            left: guardElement.offsetLeft,
            right: guardElement.offsetLeft + guardElement.offsetWidth,
            bottom: guardElement.offsetTop + guardElement.offsetHeight,
        };

        if(p.top > g.top && p.top < g.bottom){
            if(p.left > g.left && p.left < g.right){
                return true;
            }
            if(p.right < g.right && p.right > g.left){
                return true;
            }
        }

        if(p.bottom > g.top && p.bottom < g.bottom){
            if(p.left > g.left && p.left < g.right){
                return true;
            }
            if(p.right < g.right && p.right > g.left){
                return true;
            }
        }
    }

    return false;
};

const random = (max) => {
    return Math.floor(Math.random() * max);
};