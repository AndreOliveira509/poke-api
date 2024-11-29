// Adiciona o evento de clique na div de busca
document.getElementById('pokemonSearchButton').addEventListener('click', function() {
    const pokemonSearchInput = document.getElementById('pokemonSearchInput').value.trim().toLowerCase();

    // Verifica se o campo de entrada está vazio
    if (pokemonSearchInput === "") {
        alert('Por favor, insira o nome ou ID do Pokémon.');
    } else {
        fetchPokemonData(pokemonSearchInput);  // Chama a função para buscar os dados
    }
});

// Função para buscar os dados do Pokémon usando a API PokeAPI
function fetchPokemonData(query) {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    // Requisição à API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado. Verifique o nome ou ID.');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonData(data);  // Exibe os dados do Pokémon
            fetchEvolutionChain(data.species.url);  // Chama a função para buscar a cadeia de evolução
        })
        .catch(error => {
            displayError(error.message);  // Exibe erro caso não encontre o Pokémon
        });
}

// Função para exibir os dados do Pokémon na interface
function displayPokemonData(data) {
    // Atualiza a imagem do Pokémon
    const pokemonImage = document.getElementById('pokemonImage');
    pokemonImage.src = data.sprites.front_default || '';
    pokemonImage.alt = `Imagem do Pokémon ${data.name}`;

    // Atualiza o nome do Pokémon
    const pokemonName = document.getElementById('pokemonName');
    pokemonName.textContent = capitalizeFirstLetter(data.name);

    // Atualiza os tipos do Pokémon
    const pokemonTypes = document.getElementById('pokemonTypes');
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    pokemonTypes.textContent = `Tipos: ${types}`;

    // Atualiza as estatísticas do Pokémon
    const pokemonStats = document.getElementById('pokemonStats');
    pokemonStats.innerHTML = `
        <div><span>❤</span> HP: ${data.stats[0].base_stat}</div>
        <div><span>🗡️</span> Ataque: ${data.stats[1].base_stat}</div>
        <div><span>🛡️</span> Defesa: ${data.stats[2].base_stat}</div>
        <div><span>💨</span> Velocidade: ${data.stats[5].base_stat}</div>
    `;

    // Atualiza os 10 primeiros ataques do Pokémon
    const pokemonAttacks = document.getElementById('pokemonAttacks');
    const attacks = data.moves.slice(0, 10).map(move => `<li>${move.move.name}</li>`).join('');
    pokemonAttacks.innerHTML = attacks;
}

// Função para exibir mensagens de erro
function displayError(message) {
    alert(message);
    clearPokemonData();  // Limpa os dados anteriores
}

// Função para limpar os dados exibidos quando houver erro ou quando buscar outro Pokémon
function clearPokemonData() {
    document.getElementById('pokemonImage').src = '';
    document.getElementById('pokemonName').textContent = '';
    document.getElementById('pokemonTypes').textContent = '';
    document.getElementById('pokemonStats').innerHTML = '';
    document.getElementById('pokemonAttacks').innerHTML = '';
    document.getElementById('pokemonEvolutions').innerHTML = ''; // Limpa as evoluções
}

// Função para buscar a cadeia de evolução
function fetchEvolutionChain(speciesUrl) {
    fetch(speciesUrl)
        .then(response => response.json())
        .then(data => {
            const evolutionChainUrl = data.evolution_chain.url;
            return fetch(evolutionChainUrl);
        })
        .then(response => response.json())
        .then(data => {
            displayEvolutions(data.chain);
        })
        .catch(error => {
            console.error('Erro ao buscar cadeia de evolução:', error);
        });
}

// Função para exibir as evoluções
function displayEvolutions(chain) {
    const evolutionContainer = document.getElementById('pokemonEvolutions');
    evolutionContainer.innerHTML = '';  // Limpa as evoluções anteriores

    let currentPokemon = chain;
    const evolutions = [];

    // Pega as evoluções até o final da cadeia
    while (currentPokemon) {
        evolutions.push(currentPokemon.species.name);
        currentPokemon = currentPokemon.evolves_to[0];
    }

    // Limita para 3 evoluções
    evolutions.slice(0, 3).forEach(pokemonName => {
        fetchPokemonImage(pokemonName, evolutionContainer);
    });
}

// Função para buscar a imagem do Pokémon
function fetchPokemonImage(pokemonName, container) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemonElement = document.createElement('div');
            pokemonElement.classList.add('evolution');

            const image = document.createElement('img');
            image.src = data.sprites.front_default;
            image.alt = pokemonName;

            const name = document.createElement('p');
            name.textContent = capitalizeFirstLetter(pokemonName);

            pokemonElement.appendChild(image);
            pokemonElement.appendChild(name);
            container.appendChild(pokemonElement);
        })
        .catch(error => console.error('Erro ao buscar imagem:', error));
}

// Função para capitalizar a primeira letra do nome do Pokémon
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
