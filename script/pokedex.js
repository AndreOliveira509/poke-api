async function fetchPokemon() {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon = await response.json();
        addPokemonCard(pokemon);
    } catch (error) {
        displayError(error.message);
    }
}

function addPokemonCard(pokemon) {
    const cardsContainer = document.querySelector('.cards');

    // Limpa as divs antigas
    cardsContainer.innerHTML = '';

    // Cria a nova div para o Pokémon
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

    // Adiciona a nova div ao container
    cardsContainer.appendChild(card);
}

function displayError(message) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}
