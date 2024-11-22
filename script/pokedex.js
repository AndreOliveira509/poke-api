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
    
            // Limpa os cards existentes antes de exibir o Pokémon pesquisado
            const cardsContainer = document.querySelector('.cards');
            cardsContainer.innerHTML = '';
    
            // Redefine o tamanho do fundo ao valor original
            const fundosize = document.getElementById("pokedex-container");
            fundosize.style.height = '100vh';  // Ou defina o valor original que você quer (ex: '100vh')
    
            addPokemonCard(pokemon); // Exibe o Pokémon pesquisado
        } catch (error) {
            displayError(error.message);
        }
    }


// Função para adicionar um card de Pokémon
// Função para adicionar um card de Pokémon
function addPokemonCard(pokemon) {
    const cardsContainer = document.querySelector('.cards');

    // Cria a nova div para o Pokémon
    const card = document.createElement('div');
    card.classList.add('card'); // Adiciona a classe básica do card

    card.innerHTML = `
        <div class="card-img" onclick="redirectToDetails('${pokemon.name}')">
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
    // Redireciona para a página de detalhes ao clicar no card
function redirectToDetails(pokemonNameOrId) {
    window.location.href = `pokemon-details.html?pokemon=${pokemonNameOrId}`;
}

    // Adiciona o card ao container
    cardsContainer.appendChild(card);

    // Adiciona a classe "visible" após um pequeno atraso para ativar a animação
    setTimeout(() => {
        card.classList.add('visible');
    }, 100); // Delay em milissegundos para ativar a transição
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

