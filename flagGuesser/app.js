const countries = [];
const currentChallenge = {};
let score = 0;
const elements = {
    startContainer: document.querySelector('.start-container'),
    challengeContainer: document.querySelector('.challenge-container'),
    endContainer: document.querySelector('.end-container'),
    loader: document.querySelector('.start-container .loader'),
    startButton: document.querySelector('.start-container button'),
    restartButton: document.querySelector('.end-container button'),
    challengeScore: document.querySelector('.challenge-container .score'),
    challengeImage: document.querySelector('.challenge-container img'),
    challengeButtons: document.querySelectorAll('.challenge-responses button'),
    endScore: document.querySelector('.end-container .score'),
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

    nextChallenge();
    for(let button of elements.challengeButtons){
        button.addEventListener('click', checkResponse);
    }
};

const nextChallenge = () => {
    currentChallenge.responses = getChallengeResponses();
    currentChallenge.answer = getArrayRandomElement(currentChallenge.responses);

    const imageUrl = 'https://countryflagsapi.com/svg/' + currentChallenge.answer.code;
    elements.challengeImage.setAttribute('src', imageUrl);

    let i = 0;
    for(let button of elements.challengeButtons){
        button.innerText = currentChallenge.responses[i].name;
        i++;
    }

    elements.challengeScore.innerText = score;
};

const getChallengeResponses = () => {
    const countriesCloned = [...countries];
    const selectedCountries = [];

    for(let i = 0; i < 4; i++){
        const selectedCountry = getArrayRandomElement(countriesCloned);
        const countryIndex = countriesCloned.indexOf(selectedCountry);
        countriesCloned.splice(countryIndex, 1);
        selectedCountries.push(selectedCountry);
    }

    return selectedCountries;
};

const checkResponse = e => {
    if(currentChallenge.answer.name === e.target.innerText){
        score++;
        nextChallenge();
    }else{
        end();
    }
};

const end = () => {
    elements.endScore.innerText = score;

    elements.challengeContainer.classList.add('hide');
    elements.endContainer.classList.remove('hide');

    elements.restartButton.addEventListener('click', restart, {
        once: true,
    });
};

const restart = () => {
    elements.endContainer.classList.add('hide');
    elements.challengeContainer.classList.remove('hide');
    score = 0;

    nextChallenge();
};

const getArrayRandomElement = array => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

init();
