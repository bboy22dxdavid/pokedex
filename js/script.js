//variavel global para receber o nome do pokemon 
const pokemonName = document.querySelector('.pokemon_nome');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImagem = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;

//funcao que busca os pokemons
const fetchpokemon = async(pokemon) => {
    //consumindo a api
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    //iniciando condicao para verificar se a resposta da api e valida
    if (ApiResponse.status === 200) {
        //convertendo o obs json
        const data = await ApiResponse.json();
        //debugando os dados 
        //console.log(ApiResponse)

        return data;
    }


}

//funcao para redenrizar os dados vindo da api
const renderPokemon = async(pokemon) => {
    pokemonName.innerHTML = 'Carregando..';
    pokemonNumber.innerHTML = '';

    //recuperando dados da api
    const data = await fetchpokemon(pokemon);
    //iniciando condicao para verdificar se o data.name existe
    if (data) {
        //passando o nome do poquemon na tela
        pokemonImagem.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id;

        //limpando o input
        input.value = ''
    } else {
        pokemonImagem.style.display = 'none';
        pokemonName.innerHTML = 'não encontrato ';
        pokemonNumber.innerHTML = '';
    }

}

//funcao para receber os dados do form
form.addEventListener('submit', (event) => {
    //bloqueando evento padrão
    event.preventDefault();

    //debugando evento do form
    //console.log(input.value)

    //passando o valor do input, para o render
    renderPokemon(input.value.toLowerCase())


})

//funcao do botão voltar
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

//funcao do botão avancar
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

//notificando a tela para renderizar
renderPokemon(searchPokemon);