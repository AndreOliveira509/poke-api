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
            fire: ['water', 'rock', 'ground'],
            water: ['electric', 'grass'],
            grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
            electric: ['ground'],
            // Outros tipos podem ser adicionados conforme necessidade
        };

        const weaknesses = types.flatMap(type => typeWeaknesses[type] || []);
        return [...new Set(weaknesses)]; // Remove duplicatas
    };

    // Função para criar o card de cada Pokémon com tipo e fraquezas
    const createCard = (pokemon, stats) => {
        const weaknesses = getWeaknesses(pokemon.types.map(type => type.type.name));
        return `
            <div class="compare-card" onclick="redirectToDetails">
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Tipo(s): ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p>Fraquezas: ${weaknesses.length > 0 ? weaknesses.join(', ') : 'Nenhuma fraqueza detectada'}</p>
                ${createBar(stats.attack, stats.attack, 'Ataque')}
                ${createBar(stats.defense, stats.defense, 'Defesa')}
                ${createBar(stats.speed, stats.speed, 'Velocidade')}
                <p>Total de Status: ${pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</p>
            </div>
        `;
    };
    // Redireciona para a página de detalhes ao clicar no card
function redirectToDetails(pokemonNameOrId) {
    window.location.href = `/pages/pokemon.html`;
}

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