// значение из инпута
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

 }

 function renderMovies(movies){
    document.getElementById("movieContainer").innerHTML = ""
    movies.forEach((m) => {
        document.getElementById("movieContainer").innerHTML += `
            <div class="flex flex-col justify-between w-56 rounded-lg bg-slate-800 text-center  overflow-hidden transition-all duration-200 hover:-translate-y-2 relative hover:bg-slate-600 hover:shadow-md">
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

    const currentmovieDetails = movieDetails.find((m) => m.id === id)
    document.getElementById("movieCard").innerHTML = ""
    document.getElementById("movieCard").innerHTML += `
        <div class="w-1/3">
            <img class="w-full h-full object-cover" src="${currentmovieDetails.Poster}"/>
         </div>
         <div>
            <p class="text-black">Actors - актеры
                Awards - награды
                Genre - жанр
                Country - страна
                Plot - сюжет
                imdbRating - рейтинги на IMDB
                Released - дата выхода
                Runtime - продолжительность
                Title - название
            </p>
        </div>

    `
}








// // // не забыть про лоудер при загузке фильме
// // const louder = document.querySelector(".loader")
