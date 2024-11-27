document.getElementById('searchButton').addEventListener('click', async function() {
    const pokemonInput = document.getElementById('pokemonInput').value.trim().toLowerCase();
    if (pokemonInput) {
        await fetchPokemonData(pokemonInput);
    }
});

async function fetchPokemonData(query) {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado. Verifique o nome ou ID.');
        }
        const data = await response.json();
        displayPokemonData(data); // Exibe os dados do Pokémon
    } catch (error) {
        displayError(error.message); // Exibe mensagem de erro
    }
}

function displayPokemonData(data) {
    // Preenchendo as informações do Pokémon
    const pokeImage = document.getElementById('pokeImage');
    const pokeName = document.getElementById('pokeName');
    const pokeTypes = document.getElementById('pokeTypes');
    const pokeStats = document.getElementById('pokeStats');
    const pokeAttacks = document.getElementById('pokeAttacks');

    // Exibe imagem
    pokeImage.src = data.sprites.front_default || '';
    pokeImage.alt = `Imagem do Pokémon ${data.name}`;
    
    // Exibe nome
    pokeName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Capitaliza a primeira letra
    
    // Exibe tipos
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    pokeTypes.textContent = `Tipos: ${types}`;
    
    // Exibe estatísticas
    pokeStats.innerHTML = `
        <p>HP: ${data.stats[0].base_stat}</p>
        <p>Attack: ${data.stats[1].base_stat}</p>
        <p>Defense: ${data.stats[2].base_stat}</p>
        <p>Speed: ${data.stats[5].base_stat}</p>
    `;

    // Exibe os 10 primeiros ataques
    const attacks = data.moves.slice(0, 10).map(move => `<li>${move.move.name}</li>`).join('');
    pokeAttacks.innerHTML = attacks;
}

function displayError(message) {
    // Exibe uma mensagem de erro
    alert(message);
    clearPokemonData(); // Limpa os dados anteriores
}

function clearPokemonData() {
    // Limpa os dados na interface
    document.getElementById('pokeImage').src = '';
    document.getElementById('pokeName').textContent = '';
    document.getElementById('pokeTypes').textContent = '';
    document.getElementById('pokeStats').innerHTML = '';
    document.getElementById('pokeAttacks').innerHTML = '';
}
