// Objeto de fraquezas e resistências de tipos
const typeChart = {
    normal: { weak: ['fighting'], resist: [] },
    fire: { weak: ['water', 'rock', 'ground'], resist: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'] },
    water: { weak: ['electric', 'grass'], resist: ['fire', 'water', 'ice', 'steel'] },
    electric: { weak: ['ground'], resist: ['electric', 'flying', 'steel'] },
    grass: { weak: ['fire', 'ice', 'poison', 'flying', 'bug'], resist: ['water', 'electric', 'grass', 'ground'] },
    ice: { weak: ['fire', 'fighting', 'rock', 'steel'], resist: ['ice'] },
    fighting: { weak: ['flying', 'psychic', 'fairy'], resist: ['rock', 'bug', 'dark'] },
    poison: { weak: ['ground', 'psychic'], resist: ['grass', 'fighting', 'poison', 'bug', 'fairy'] },
    ground: { weak: ['water', 'grass', 'ice'], resist: ['poison', 'rock'] },
    flying: { weak: ['electric', 'ice', 'rock'], resist: ['grass', 'fighting', 'bug'] },
    psychic: { weak: ['bug', 'ghost', 'dark'], resist: ['fighting', 'psychic'] },
    bug: { weak: ['fire', 'flying', 'rock'], resist: ['grass', 'fighting', 'ground'] },
    rock: { weak: ['water', 'grass', 'fighting', 'ground', 'steel'], resist: ['normal', 'fire', 'poison', 'flying'] },
    ghost: { weak: ['ghost', 'dark'], resist: ['poison', 'bug'] },
    dragon: { weak: ['ice', 'dragon', 'fairy'], resist: ['fire', 'water', 'electric', 'grass'] },
    dark: { weak: ['fighting', 'bug', 'fairy'], resist: ['ghost', 'dark'] },
    steel: { weak: ['fire', 'fighting', 'ground'], resist: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'] },
    fairy: { weak: ['poison', 'steel'], resist: ['fighting', 'bug', 'dark'] }
};

// Função para calcular eficácia de tipos
function typeEffectiveness(attackerType, defenderTypes) {
    let effectiveness = 1; // Começa com eficácia neutra
    defenderTypes.forEach(defenderType => {
        if (typeChart[attackerType].weak.includes(defenderType)) {
            effectiveness *= 2; // Dano dobrado
        } else if (typeChart[attackerType].resist.includes(defenderType)) {
            effectiveness /= 2; // Dano reduzido
        }
    });
    return effectiveness;
}

// Função para buscar dados dos Pokémon
async function fetchPokemonData(nameOrId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Pokémon não encontrado.');
    return await response.json();
}

// Função para simular a batalha
async function simulateBattle() {
    const pokemon1Input = document.getElementById('simuladorpokemon1').value;
    const pokemon2Input = document.getElementById('simuladorpokemon2').value;
    const resultsContainer = document.getElementById('simulador-results');

    if (!pokemon1Input || !pokemon2Input) {
        resultsContainer.innerHTML = '<p style="color: red;">Preencha ambos os campos!</p>';
        return;
    }

    try {
        // Busca dados dos Pokémon
        const [pokemon1, pokemon2] = await Promise.all([
            fetchPokemonData(pokemon1Input),
            fetchPokemonData(pokemon2Input)
        ]);

        // Calcula eficácia dos ataques
        const pokemon1Effectiveness = typeEffectiveness(
            pokemon1.types[0].type.name,
            pokemon2.types.map(type => type.type.name)
        );

        const pokemon2Effectiveness = typeEffectiveness(
            pokemon2.types[0].type.name,
            pokemon1.types.map(type => type.type.name)
        );

        // Simula o dano
        const pokemon1Damage = Math.round(
            pokemon1.stats[1].base_stat * pokemon1Effectiveness
        ); // Ataque base * eficácia
        const pokemon2Damage = Math.round(
            pokemon2.stats[1].base_stat * pokemon2Effectiveness
        );

        // Decide vencedor
        const winner =
            pokemon1Damage > pokemon2Damage
                ? pokemon1.name
                : pokemon2Damage > pokemon1Damage
                ? pokemon2.name
                : 'Empate';

        // Exibe os Pokémon escolhidos e resultados
        resultsContainer.innerHTML = `
            <div style="display: flex; justify-content: space-around;" class="simulador-pokemon">
                <div>
                    <h3>${pokemon1.name}</h3>
                    <img src="${pokemon1.sprites.front_default}" alt="${pokemon1.name}">
                    <p>Tipos: ${pokemon1.types.map(type => type.type.name).join(', ')}</p>
                </div>
                <div>
                    <h3>${pokemon2.name}</h3>
                    <img src="${pokemon2.sprites.front_default}" alt="${pokemon2.name}">
                    <p>Tipos: ${pokemon2.types.map(type => type.type.name).join(', ')}</p>
                </div>
            </div>
            <div class="relatorio-simulador">
                <h3>Resultados:</h3>
                <p>${pokemon1.name}: Dano causado - ${pokemon1Damage}</p>
                <p>${pokemon2.name}: Dano causado - ${pokemon2Damage}</p>
                <h4>Vencedor: ${winner}</h4>
            </div>
        `;
    } catch (error) {
        resultsContainer.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
    }
}
// Função para calcular fraquezas de um Pokémon
function getWeaknesses(types) {
    const weaknesses = new Set();
    types.forEach(type => {
        typeChart[type].weak.forEach(weakType => weaknesses.add(weakType));
    });
    return [...weaknesses];
}

// Função para buscar dados dos Pokémon
async function fetchPokemonData(nameOrId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Pokémon não encontrado.');
    return await response.json();
}

// Função para simular a batalha
async function simulateBattle() {
    const pokemon1Input = document.getElementById('simuladorpokemon1').value;
    const pokemon2Input = document.getElementById('simuladorpokemon2').value;
    const resultsContainer = document.getElementById('simulador-results');

    if (!pokemon1Input || !pokemon2Input) {
        resultsContainer.innerHTML = '<p style="color: red;">Preencha ambos os campos!</p>';
        return;
    }

    try {
        // Busca dados dos Pokémon
        const [pokemon1, pokemon2] = await Promise.all([
            fetchPokemonData(pokemon1Input),
            fetchPokemonData(pokemon2Input)
        ]);

        // Calcula eficácia dos ataques
        const pokemon1Effectiveness = typeEffectiveness(
            pokemon1.types[0].type.name,
            pokemon2.types.map(type => type.type.name)
        );

        const pokemon2Effectiveness = typeEffectiveness(
            pokemon2.types[0].type.name,
            pokemon1.types.map(type => type.type.name)
        );

        // Calcula total de status
        const pokemon1TotalStats = pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
        const pokemon2TotalStats = pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

        // Calcula fraquezas
        const pokemon1Weaknesses = getWeaknesses(pokemon1.types.map(type => type.type.name));
        const pokemon2Weaknesses = getWeaknesses(pokemon2.types.map(type => type.type.name));

        // Simula o dano
        const pokemon1Damage = Math.round(
            pokemon1.stats[1].base_stat * pokemon1Effectiveness
        ); // Ataque base * eficácia
        const pokemon2Damage = Math.round(
            pokemon2.stats[1].base_stat * pokemon2Effectiveness
        );

        // Decide vencedor
        const winner =
            pokemon1Damage > pokemon2Damage
                ? pokemon1.name
                : pokemon2Damage > pokemon1Damage
                ? pokemon2.name
                : 'Empate';

        // Exibe os Pokémon escolhidos e resultados
        resultsContainer.innerHTML = `
            <div style="display: flex; justify-content: space-around;" class="simulador-pokemon">
                <div>
                    <h3>${pokemon1.name}</h3>
                    <img src="${pokemon1.sprites.front_default}" alt="${pokemon1.name}">
                    <p>Tipos: ${pokemon1.types.map(type => type.type.name).join(', ')}</p>
                    <p>Fraquezas: ${pokemon1Weaknesses.join(', ')}</p>
                    <p>Total de Status: ${pokemon1TotalStats}</p>
                </div>
                <div>
                    <h3>${pokemon2.name}</h3>
                    <img src="${pokemon2.sprites.front_default}" alt="${pokemon2.name}">
                    <p>Tipos: ${pokemon2.types.map(type => type.type.name).join(', ')}</p>
                    <p>Fraquezas: ${pokemon2Weaknesses.join(', ')}</p>
                    <p>Total de Status: ${pokemon2TotalStats}</p>
                </div>
            </div>
            <div class="relatorio-simulador">
                <h3>Resultados:</h3>
                <p>${pokemon1.name}: Dano causado - ${pokemon1Damage}</p>
                <p>${pokemon2.name}: Dano causado - ${pokemon2Damage}</p>
                <h4>Vencedor: ${winner}</h4>
            </div>
        `;
    } catch (error) {
        resultsContainer.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
    }
}
