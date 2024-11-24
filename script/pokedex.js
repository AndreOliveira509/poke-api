// Função para buscar Pokémon pelo nome ou ID
async function fetchPokemon() {
    const pokemonInput = document.getElementById('pokemonSearchInput').value.toLowerCase();
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
    pokeTypes.textContent = `Tipo(s): ${pokemon.types.map(type => type.type.name).join(', ')}`;

    // Exibindo estatísticas com gráficos de barras
    const statsHtml = pokemon.stats.map(stat => {
        return `
            <div>
                <span>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</span>
                <div class="compare-bar-container">
                    <div class="compare-bar" style="width: ${(stat.base_stat / 200) * 100}%; background-color: ${getStatColor(stat.stat.name)};"></div>
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

// Função para determinar a cor da barra de estatísticas
function getStatColor(statName) {
    const colors = {
        hp: '#FF0000',
        attack: '#FF9900',
        defense: '#339900',
        'special-attack': '#9933FF',
        'special-defense': '#FF33FF',
        speed: '#0099FF'
    };
    return colors[statName] || '#777'; // Cor padrão
}

// Adiciona o evento ao botão de busca
document.getElementById('searchButton').addEventListener('click', fetchPokemon);

// Também adiciona o evento de pressionar "Enter" no campo de pesquisa
document.getElementById('pokemonSearchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchPokemon();
    }
});
