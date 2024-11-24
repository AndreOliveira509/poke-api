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

// Função para buscar Pokémon pelo nome ou ID
async function fetchPokemon() {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado.');
        }
        const pokemon = await response.json();
        displayPokemonDetails(pokemon); // Exibe os detalhes do Pokémon
    } catch (error) {
        alert(error.message);
    }
}

// Função para exibir os detalhes do Pokémon
function displayPokemonDetails(pokemon) {
    const pokeImage = document.getElementById('pokeImage');
    const pokeName = document.getElementById('pokeName');
    const pokeTypes = document.getElementById('pokeTypes');
    const pokeStats = document.getElementById('pokeStats');
    const pokeAttacks = document.getElementById('pokeAttacks');

    // Exibindo informações básicas
    pokeImage.src = pokemon.sprites.front_default;
    pokeName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokeTypes.textContent = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;

    // Exibindo estatísticas
    const statsHtml = pokemon.stats.map(stat => {
        return `
            <div>
                <span>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</span>
                <div class="compare-bar-container">
                    <div class="compare-bar" style="width: ${(stat.base_stat / 200) * 100}%; background-color: ${typeColors[pokemon.types[0].type.name] || '#777'};"></div>
                </div>
            </div>
        `;
    }).join('');
    pokeStats.innerHTML = statsHtml;

    // Exibindo ataques (top 10)
    const attacks = pokemon.moves.slice(0, 10); // Pegando os 10 primeiros ataques
    const attacksHtml = attacks.map(move => `<li>${move.move.name}</li>`).join('');
    pokeAttacks.innerHTML = attacksHtml;
}

// Adiciona o evento ao botão de busca
document.getElementById('searchButton').addEventListener('click', fetchPokemon);

// Também adiciona o evento de pressionar "Enter" no campo de pesquisa
document.getElementById('pokemonInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchPokemon();
    }
});
