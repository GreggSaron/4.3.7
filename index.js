const searchInput = document.querySelector('.input');
const optionsList = document.querySelector('.optionsList');
const cardsContainer = document.querySelector('.cardsContainer');

optionsList.addEventListener('click', clearUl)

function debounce( callback, delay ) {
    let timeout;
    return function() {
        const fnCall = () => {callback.apply(this, arguments)};
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, delay);
    }
}

function clearUl () {
    while(optionsList.firstChild) {
        optionsList.removeChild(optionsList.firstChild)
    };
    searchInput.value = '';
}

function createLi (name) {
    let liElem = document.createElement('li');
    liElem.classList.add('optionsList', 'optionsList_option');
    liElem.textContent = name;
    optionsList.appendChild(liElem);
    return liElem;
}

function createCard (name, owner, stars) {
    let liElem = document.createElement('li');
    liElem.classList.add('cardsContainer', 'cardsContainer_card');
    let liElemUl = document.createElement('li');
    let removeBtn = document.createElement('button');

    removeBtn.textContent = `X`;
    removeBtn.addEventListener('click', () => {
        removeBtn.parentElement.remove()
    });
    removeBtn.classList.add('removeBtn');
    liElem.appendChild(removeBtn);
    let liElemUl_name = document.createElement('li');
    liElemUl_name.textContent = `Name: ${name}`
    liElemUl.appendChild(liElemUl_name);
    let liElemUl_owner = document.createElement('li');
    liElemUl_owner.textContent = `Owner: ${owner}`
    liElemUl.appendChild(liElemUl_owner);
    let liElemUl_stars = document.createElement('li');
    liElemUl_stars.textContent = `Stars: ${stars}`
    liElemUl.appendChild(liElemUl_stars);
    liElem.appendChild(liElemUl);
    cardsContainer.appendChild(liElem);
}

function searching () {
    let searchingValue  = this.value;
    while(optionsList.firstChild) {
        optionsList.removeChild(optionsList.firstChild)
    };    
    fetch(`https://api.github.com/search/repositories?q=${searchingValue}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            for(let i = 0; i < 5; i++){
                let cur = createLi(data.items[i].name);
                cur.addEventListener('click', createCard.bind(this, data.items[i].name, data.items[i].owner.login, data.items[i].stargazers_count));
            }
            

        })
}


searching = debounce(searching, 600);

searchInput.addEventListener('input', searching);

