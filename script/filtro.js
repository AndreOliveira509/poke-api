function applyFilter() {
    const input = document.getElementById('pokemonInput').value.toLowerCase();
    const typeFilter = document.getElementById('pokemonTypeFilter').value;

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('h2').textContent.toLowerCase();
        const types = card.querySelector('p').textContent.toLowerCase();

        const matchesName = input === '' || name.includes(input);
        const matchesType = typeFilter === '' || types.includes(typeFilter);

        card.style.display = matchesName && matchesType ? '' : 'none';
    });
}

document.getElementById('pokemonInput').addEventListener('input', applyFilter);
document.getElementById('pokemonTypeFilter').addEventListener('change', applyFilter);