    let offset = 0; // Posição inicial na lista de Pokémon
    const limit = 14; // Número de Pokémon carregados por vez
    // Objeto com as cores baseadas nos tipos de Pokémon
    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };

    // Função para buscar a cor baseada no tipo do Pokémon
    function getTypeColor(types) {
        return typeColors[types[0].type.name] || '#777'; // Cor padrão se o tipo não for encontrado
    }

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

        // Obtém o tipo principal do Pokémon (primeiro tipo)
        const mainType = pokemon.types[0].type.name;
        const bgColor = typeColors[mainType] || '#ffffff'; // Define uma cor padrão caso o tipo não esteja mapeado

        // Cria o elemento do card
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundColor = bgColor; // Aplica a cor baseada no tipo

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




// Função chamada ao clicar no botão
function comparePokemons() {
    event.preventDefault();  // Previne o comportamento padrão (recarregar página)
  
    const pokemon1 = document.getElementById('pokemon1').value.toLowerCase().trim();
    const pokemon2 = document.getElementById('pokemon2').value.toLowerCase().trim();

    if (!pokemon1 || !pokemon2) {
        alert("Por favor, preencha os dois campos.");
        return;
    }

    // URLs da API
    const url1 = `https://pokeapi.co/api/v2/pokemon/${pokemon1}`;
    const url2 = `https://pokeapi.co/api/v2/pokemon/${pokemon2}`;

    // Realizando as requisições em paralelo
    Promise.all([fetch(url1), fetch(url2)])
        .then(([response1, response2]) => {
            if (!response1.ok || !response2.ok) {
                throw new Error('Um ou ambos os Pokémon não foram encontrados.');
            }
            return Promise.all([response1.json(), response2.json()]);
        })
        .then(([data1, data2]) => {
            displayComparison(data1, data2);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para exibir os resultados de comparação
function displayComparison(pokemon1, pokemon2) {
    const compareResults = document.getElementById('compare-results');
    compareResults.innerHTML = ''; // Limpa resultados anteriores

    const stats1 = pokemon1.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    const stats2 = pokemon2.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    // Função para criar a barra de comparação
    const createBar = (value1, value2, label) => `
        <div class="compare-row">
            <span>${label}</span>
            <div class="compare-bar-container">
                <div class="compare-bar" style="width: ${(value1 / 200) * 100}%; background-color: #ffcb05;"></div>
                <div class="compare-bar" style="width: ${(value2 / 200) * 100}%; background-color: #c641ff;"></div>
            </div>
        </div>
    `;

    // Função para criar a barra de disputa entre os Pokémon
    const createCompetingBar = (value1, value2, label) => `
        
    `;

    // Função para verificar fraquezas do Pokémon baseado em seu tipo
    const getWeaknesses = (types) => {
      const typeWeaknesses = {
        normal: ['fighting'],
        fire: ['water', 'rock', 'ground'],
        water: ['electric', 'grass'],
        grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
        electric: ['ground'],
        ice: ['fire', 'fighting', 'rock', 'steel'],
        fighting: ['flying', 'psychic', 'fairy'],
        poison: ['ground', 'psychic'],
        ground: ['water', 'grass', 'ice'],
        flying: ['electric', 'ice', 'rock'],
        psychic: ['bug', 'ghost', 'dark'],
        bug: ['fire', 'flying', 'rock'],
        rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
        ghost: ['ghost', 'dark'],
        dragon: ['ice', 'dragon', 'fairy'],
        dark: ['fighting', 'bug', 'fairy'],
        steel: ['fire', 'fighting', 'ground'],
        fairy: ['poison', 'steel']
};

        const weaknesses = types.flatMap(type => typeWeaknesses[type] || []);
        return [...new Set(weaknesses)]; // Remove duplicatas
    };

    // Função para criar o card de cada Pokémon com tipo e fraquezas
    const createCard = (pokemon, stats) => {
        const weaknesses = getWeaknesses(pokemon.types.map(type => type.type.name));
        return `
            <div class="compare-card">
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <div class="img-compare"><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></div>
                <p>Tipo(s): ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p>Fraquezas: ${weaknesses.length > 0 ? weaknesses.join(', ') : 'Nenhuma fraqueza detectada'}</p>
                ${createBar(stats.attack, stats.attack, 'Ataque')}
                ${createBar(stats.defense, stats.defense, 'Defesa')}
                ${createBar(stats.speed, stats.speed, 'Velocidade')}
                <p>Total de Status: ${pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</p>
            </div>
        `;
    };

    // Exibe os cards de comparação no DOM
    compareResults.innerHTML = `
        ${createCard(pokemon1, stats1)}
        <div class="vs">VS</div>
        ${createCard(pokemon2, stats2)}

        <div class="competing-bars">
            ${createCompetingBar(stats1.attack, stats2.attack, 'Ataque')}
            ${createCompetingBar(stats1.defense, stats2.defense, 'Defesa')}
            ${createCompetingBar(stats1.speed, stats2.speed, 'Velocidade')}
        </div>
    `;
}

