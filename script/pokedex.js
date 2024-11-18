let offset = 0; // Posição inicial na lista de Pokémon
const limit = 10; // Número de Pokémon carregados por vez

// Função para carregar uma lista de Pokémon com paginação
async function fetchPokemonList() {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao carregar a lista de Pokémon.');
        }
        const data = await response.json();
        displayPokemonList(data.results); // Exibe os Pokémon na tela
        offset += limit; // Atualiza o offset para o próximo lote
    } catch (error) {
        displayError(error.message);
    }
}

// Função para exibir os Pokémon carregados
async function displayPokemonList(pokemonList) {
    const cardsContainer = document.querySelector('.cards');

    // Carrega os detalhes de cada Pokémon individualmente
    for (const pokemon of pokemonList) {
        try {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            addPokemonCard(data); // Adiciona o Pokémon ao container
        } catch (error) {
            console.error('Erro ao carregar Pokémon:', error);
        }
    }
}

// Função para buscar um Pokémon específico
async function fetchPokemon() {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado.');
        }
        const pokemon = await response.json();
        addPokemonCard(pokemon, true); // Apaga os Pokémon anteriores e exibe o buscado
    } catch (error) {
        displayError(error.message);
    }
}

// Função para adicionar um card de Pokémon
function addPokemonCard(pokemon, clearExisting = false) {
    const cardsContainer = document.querySelector('.cards');

    // Limpa os cartões antigos apenas se for uma pesquisa
    if (clearExisting) {
        cardsContainer.innerHTML = '';
    }

    // Cria o elemento do card
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-img">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
        <div class="card-status">
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <p>Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <div class="card-atkdff">
                <p>Ataque: ${pokemon.stats[1].base_stat}</p>
                <p>Defesa: ${pokemon.stats[2].base_stat}</p>
                <p>HP: ${pokemon.stats[0].base_stat}</p>
                <p>Velocidade: ${pokemon.stats[5].base_stat}</p>
            </div>
        </div>
    `;

    cardsContainer.appendChild(card);
}

// Função para exibir mensagens de erro
function displayError(message) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Carrega a lista inicial de Pokémon ao carregar a página
window.onload = () => {
    fetchPokemonList();
let fundosize = document.getElementById("pokedex-container");
let cards = document.querySelector(".cards");

function aumentarAltura() {
    // Função para calcular e aumentar altura de um elemento
    function aumentarAlturaElemento(elemento, incrementoVh) {
        let currentHeight = parseFloat(getComputedStyle(elemento).height); // Altura atual em pixels
        let vhToPixels = window.innerHeight / 100; // 1vh em pixels
        let newHeight = currentHeight + (incrementoVh * vhToPixels); // Incrementa a altura
        elemento.style.height = `${newHeight}px`; // Define a nova altura
    }

    // Aumenta a altura de ambos os elementos
    aumentarAlturaElemento(fundosize, 110); // Incrementa 130vh no container
    aumentarAlturaElemento(cards, 110);    // Incrementa 130vh nas cards
}

// Exemplo de chamada ao clicar no botão "Mostrar mais"
document.getElementById("pokedex-btn").addEventListener("click", aumentarAltura);
    // Adiciona funcionalidade ao botão "Mostrar mais"
    const loadMoreButton = document.getElementById('pokedex-btn');
    loadMoreButton.addEventListener('click', fetchPokemonList);
    
    
};

