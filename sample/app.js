const formElement = document.querySelector('form');

formElement.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e);
});

