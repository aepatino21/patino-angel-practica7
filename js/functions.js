// Character card creation
function createCard(img, name, status, race, location, debut) {
    let statusColor = '';
    let characterCard = document.createElement('div');
    characterCard.className = 'character';

    if (status === 'Alive') {
        statusColor = '#55CC44';
    } else if (status === 'Dead') {
        statusColor = "#D63D2E";
    } else {
        statusColor = "#9E9E9E";
    }

    characterCard.innerHTML = `
        <img src="${img}" alt="Character">
        <div class="character-info">
            <h3 class="name">${name}</h3>
            <p class="status"><span class="icon"><i class="fa-solid fa-circle" style="color: ${statusColor}"></i></span>&nbsp;${status} - ${race}</p>
            <p class="apparition">Last Known location:</p>
            <p class="desc">${location}</p>
            <p class="apparition">First seen in:</p>
            <p class="desc">${debut}</p>  
        </div>
    `;

    charactersContainer.appendChild(characterCard);
}

// Add character cards to the page
function addCharacterCard() {
    while (index < 6) {
        let random = randomNumber();
        if (!characterIDs.includes(random)) {
            characterIDs.push(random);
            fetchData(random);
            index++;
        }
    }

    index = 0;
}

// Get a random number
function randomNumber () {
    return Math.floor(Math.random() * 827) + 1;

}

// Fetch data from the API
async function fetchData(i) {
    let characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${i}`);
    let characterData = await characterResponse.json();

    let episodeResponse = await fetch(characterData.episode[0]);
    let episodeData = await episodeResponse.json();

    createCard(characterData.image, characterData.name, characterData.status, characterData.species, characterData.location.name, episodeData.name);
}

// Elements from the HTML file
const charactersContainer = document.getElementById('characters');
const loadBtn = document.getElementById('load-btn');
var index = 0;
var characterIDs = [];
window.onload = addCharacterCard;
loadBtn.addEventListener('click', addCharacterCard);