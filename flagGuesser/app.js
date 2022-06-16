const countries = [];

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
};

init();
