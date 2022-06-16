const countries = [];
const elements = {
    startContainer: document.querySelector('.start-container'),
    challengeContainer: document.querySelector('.challenge-container'),
    loader: document.querySelector('.start-container .loader'),
    startButton: document.querySelector('.start-container button'),
};

const init = () => {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => prepareData(data));
};

const prepareData = data => {
    for(let entry of data){
        const country = {
            name: entry.translations.fra.common,
            code: entry.cca2,
        };

        countries.push(country);
    }

    elements.loader.remove();
    elements.startButton.classList.remove('hide');
    elements.startButton.addEventListener('click', start, {
        once: true,
    });
};

const start = () => {
    elements.startContainer.remove();
    elements.challengeContainer.classList.remove('hide');
};

const nextChallenge = () => {
    // Tirer 4 pays au hasard
    // En choisir un comme bonne réponse
    // Afficher son drapeau dans l'image
    // Afficher les 4 propositions dans les boutons
};

init();
