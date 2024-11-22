// Obtém o parâmetro da URL
const params = new URLSearchParams(window.location.search);
const pokemonNameOrId = params.get('pokemon');

// Função para buscar os detalhes do Pokémon
function fetchPokemonDetails() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado.');
            }
            return response.json();
        })
        .then(data => displayPokemonDetails(data))
        .catch(error => {
            alert(error.message);
        });
}

// Função para exibir os detalhes
function displayPokemonDetails(pokemon) {
    const container = document.getElementById('pokemon-details');
    const weaknesses = getWeaknesses(pokemon.types.map(type => type.type.name));

    container.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <img src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="GIF do Pokémon">
        <h3>Tipo(s): ${pokemon.types.map(type => type.type.name).join(', ')}</h3>
        <h3>Ataques:</h3>
        <ul>
            ${pokemon.moves.map(move => `<li>${move.move.name}</li>`).join('')}
        </ul>
        <h3>Fraquezas:</h3>
        <p>${weaknesses.length > 0 ? weaknesses.join(', ') : 'Nenhuma fraqueza detectada.'}</p>
        <h3>Estatísticas:</h3>
        <div class="stats-chart">
            ${pokemon.stats.map(stat => `
                <div>
                    <strong>${stat.stat.name.toUpperCase()}</strong>: ${stat.base_stat}
                </div>
            `).join('')}
        </div>
    `;
}

// Função para calcular fraquezas
function getWeaknesses(types) {
    const typeWeaknesses = {
        fire: ['water', 'rock', 'ground'],
        water: ['electric', 'grass'],
        grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
        electric: ['ground'],
        // Adicione outros tipos conforme necessário
    };

    const weaknesses = types.flatMap(type => typeWeaknesses[type] || []);
    return [...new Set(weaknesses)];
}

// Chama a função ao carregar a página
fetchPokemonDetails();
