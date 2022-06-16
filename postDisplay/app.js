const containerElement = document.getElementById('posts');
const postTemplate = document.getElementById('postTemplate');
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

fetch(apiUrl)
    .then(response => response.json())
    .then(posts => displayPosts(posts));

// Equivalent
// const promise = fetch(apiUrl);
// promise.then(response => {
//     return response.json();
// }).then(posts => {
//     displayPosts(posts);
// });


const displayPosts = posts => {
    for(let post of posts){
        displayPost(post);
    }
};

const displayPost = post => {
    const postElement = document.importNode(postTemplate.content, true);

    const titleElement = postElement.querySelector('h2');
    titleElement.innerText = post.title;

    const bodyElement = postElement.querySelector('p');
    bodyElement.innerText = post.body;

    containerElement.appendChild(postElement);
};

// Equivalent sans template
// const displayPost = post => {
//     const titleElement = document.createElement('h2');
//     titleElement.innerText = post.title;
//
//     const bodyElement = document.createElement('p');
//     bodyElement.innerText = post.body;
//
//     const postElement = document.createElement('div');
//     postElement.classList.add('post');
//     postElement.append(titleElement, bodyElement);
//
//     containerElement.appendChild(postElement);
// };
