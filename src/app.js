// значение из инпута
const form = document.getElementById('form')
const input = document.getElementById("input")

form.onsubmit = function (event) {
    event.preventDefault()

    let movie = input.value
    console.log(movie)


    // запрос на сервер

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'Td24bfq18lmsh5KqGTIsh6amrNJRp1h4MngjsnIdn2a8CFcrl5',
            'X-RapidAPI-Host': 'moviesdb5.p.rapidapi.com'
        }
     };

async function loadMovies(movie) {
    const response = await fetch(`https://moviesdb5.p.rapidapi.com/om?s=${movie}", options`);
    const data = await response.json()

    console.log(data)
}
loadMovies()
}




// // не забыть про лоудер при загузке фильме
// const louder = document.querySelector(".loader")
