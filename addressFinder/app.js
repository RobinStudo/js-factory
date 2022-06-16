const searchElement = document.querySelector('form input[type="search"]');
const resultElement = document.getElementById('result');
const apiUrl = 'https://api-adresse.data.gouv.fr/search/';

searchElement.addEventListener('input', () => {
    const query = searchElement.value;
    const url = new URL(apiUrl);
    url.searchParams.set('q', query);

    const promise = fetch(url.toString());
    promise.then(response => {
       return response.json();
    }).then(data => {
        resultElement.replaceChildren();

        for(let address of data.features){
            const li = document.createElement('li');
            li.innerText = address.properties.label;
            resultElement.appendChild(li);
        }
    });
});
