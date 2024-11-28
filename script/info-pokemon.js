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
        <p>HP: ${data.stats[0].base_stat}</p>
        <p>Attack: ${data.stats[1].base_stat}</p>
        <p>Defense: ${data.stats[2].base_stat}</p>
        <p>Speed: ${data.stats[5].base_stat}</p>
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
}

// Função para capitalizar a primeira letra do nome do Pokémon
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}