const form = document.getElementById('form')
const input = document.getElementById("input")
let movie


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'Td24bfq18lmsh5KqGTIsh6amrNJRp1h4MngjsnIdn2a8CFcrl5',
        'X-RapidAPI-Host': 'moviesdb5.p.rapidapi.com'
    }
 }

 async function loadMovies() {
    const input = document.getElementById("input")
    let movie = input.value.trim()

    const response = await fetch(`https://moviesdb5.p.rapidapi.com/om?s=${movie}`, options);
    const data = await response.json()

    try{
        const movies = data.Search
        renderMovies(movies)
        return movies
    }
    catch{
        document.getElementById("movieContainer").innerHTML = `
        <div class="flex flex-col">
            <p class="text-3xl">К сожалению, по вашему запросу ничего не найдено...</p>
            <p class="mt-10 text-xl">Попробуйте изменить запрос.</p>
        <div>
        `
    }

    input.value = ""

 }

 function renderMovies(movies){

    document.getElementById("movieContainer").innerHTML = ""
    movies.forEach((m) => {
        document.getElementById("movieContainer").innerHTML += `
            <div class="flex flex-col justify-between w-56 rounded-lg bg-slate-800 text-center  overflow-hidden transition-all duration-200 hover:-translate-y-2 relative hover:bg-slate-700 hover:shadow-md">
                <img class="w-56 h-80 object-cover" src="${m.Poster}"/>
                <div class="px-3 py-4  font-bold text-lg uppercase">${m.Title}</div>
                <div class="px-3 pb-3 font-bold text-base text-blue-700">${m.Year}</div>
                <button id="openModalButton-${m.imdbID}" class="w-full bg-gray-900 text-xl text-yellow-500 px-4 py-4 font-semibold">Подробнее</button>
            </div>
        `
    })

    movies.forEach((m) => {
        document.getElementById(`openModalButton-${m.imdbID}`).addEventListener("click", () => openMoreInformation(m.imdbID))
    })
}

 form.onsubmit = function (event) {
    event.preventDefault()
    loadMovies(`${movie}`)

}

const modalWindow = document.getElementById("modalWindow")
const closeModalButton = document.getElementById("modal-btn")

closeModalButton.addEventListener("click", closeModal)

function closeModal() {
    modalWindow.style.display = "none"
}

async function openMoreInformation(id){
    const response = await fetch('https://moviesdb5.p.rapidapi.com/om?i='+id, options)
    const movieDetails = await response.json()

    console.log(movieDetails)

    modalWindow.style.display = "flex"

    document.getElementById("movieCard").innerHTML = ""
    document.getElementById("movieCard").innerHTML += `
            <div class "film__title">
                <p class="text-white uppercase text-3xl pb-3">${movieDetails.Title}</p>
            </div>
            <div class="film__img">
                <img class="overflow-y-hidden" src="${movieDetails.Poster}"/>
            </div>
            <div class="film__desc">

                <p class="text-teal-400 text-lg">Released: ${movieDetails.Released}</p>
                <p class="text-teal-400 text-lg">Rating: ${movieDetails.imdbRating  !== "N/A" ?  movieDetails.imdbRating : "-"}
                </p>

                <p class="text-teal-400 text-lg">Runtime: ${movieDetails.Runtime !== "N/A" ?  movieDetails.Runtime : "-"}</p>
                <p class="text-teal-400 text-lg">Awards: ${movieDetails.Awards !== "N/A" ?  movieDetails.Awards : "-"}</p>
                <p class="text-teal-400 text-lg">Country: ${movieDetails.Country !== "N/A" ?  movieDetails.Country : "-"}</p>
                <p class="text-teal-400 text-lg">Genre: ${movieDetails.Genre !== "N/A" ?  movieDetails.Genre : "-"}</p>
                <br>

                <p class="text-white text-xl font-light tracking-wider">Plot: <br> ${movieDetails.Plot !== "N/A" ?  movieDetails.Plot : "-"}</p>

        </div>
        `
}
