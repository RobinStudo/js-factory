const element = document.createElement('video');

element.setAttribute('src', 'myVideo.mp4');
element.classList.add('my-class');
element.innerText = 'test';

document.body.appendChild(element);

