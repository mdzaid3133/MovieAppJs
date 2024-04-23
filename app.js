
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const bannerImg = document.querySelector('#bannerImg');
const movieCardContainer = document.querySelector('#movieCardContainer');
const movieDetailsSection = document.querySelector('#movieDetailsSection');
const morebtn = document.querySelector('#morebtn');
const Heading = document.querySelector('.Heading');
const serisetab = document.querySelector('#serise-tab');
const movietab = document.querySelector('#movie-tab');




async function fetchMovieDataFromApi(keyword) {

    if (keyword !== "") {
        const URL = `http://www.omdbapi.com/?t=${keyword}&apikey=148c199`


        let res = await fetch(URL)
        let data = await res.json()
        console.log(data)
        let { Error } = data;
        if (!Error) {
            return data;
        } else {
            alert(Error)
        }
    } else {
        alert('Search Not Found!!!')
    }


}
let page = 1;
let showType = 'movie'
Heading.textContent = `Latest ${showType}`

serisetab.addEventListener('click', (e) => {
    movietab.classList.remove('active');
    serisetab.classList.add('active')
    showType = e.target.textContent
    Heading.textContent = `Latest ${showType}`
    if (showType == "Series") {
        movieCardContainer.innerHTML = "";
    }
    page = 1;
    showAllData()

})
movietab.addEventListener('click', (e) => {
    movietab.classList.add('active');
    serisetab.classList.remove('active')
    showType = e.target.textContent
    Heading.textContent = `Latest ${showType}`
    if (showType == "Movie") {
        movieCardContainer.innerHTML = "";
    }
    page = 1;
    showAllData()
})
morebtn.addEventListener('click', async () => {
    page++;
    showAllData()

})
async function fetchAllMovieData() {
    let url = `http://www.omdbapi.com/?apikey=148c199&s=${showType.toLowerCase()}&page=${page}`
    let res = await fetch(url)
    let data = await res.json()
    if (data) {
        return data;
    } else {
        console.log('Server Error')
    }
}

async function showAllData() {
    let result = await fetchAllMovieData();
    if (page === 1) {
        movieCardContainer.innerHTML = ""
    }
    let { Search } = result;
    setTimeout(() => {
        Search.forEach((movie) => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.id = movie.imdbID;
            card.innerHTML = `
                <img src=${movie.Poster} alt="${movie.Title}">
                <div class="card-content">
                    <h2>${movie.Title}</h2>
                    <p>Type: ${movie.Type}</p>
                    <p>Year: ${movie.Year}</p>
                </div>
            `;
            card.addEventListener('click', (e) => {
                fetchMovieDetails(movie.imdbID)
                //silidWindow()
                openPopup();
    
            })
            movieCardContainer.appendChild(card);
        });
    }, 300);
}
showAllData()

function displayResult(result) {
    const { Title,
        imdbRating,
        Genre,
        Released,
        Runtime,
        Actors,
        Plot,
        Poster,
        Director,
        Language,
        BoxOffice,
        Country, } = result;

    let newGenre = Genre?.split(", ");

    // bannerImg.src = Poster

    movieDetailsSection.innerHTML = `<div class="poster">
       <img src=${Poster} alt="">
   </div>
   <div class="details">
       <h2 class="movie-name">${Title}</h2>
       <p class="Rating">Rating : ${imdbRating}</p>

       <div class="tabs-container">
           <div class="tab ">${newGenre[0]}</div>
           <div class="tab">${newGenre[1]}</div>
           <div class="tab">${newGenre[2]}</div>
       </div>

       <div class="details-container">
           <label>Relesed Date :</label><span class="relesedDate">${Released}</span><br><br>
           <label>Duration :</label><span class="duration">${Runtime}</span><br><br>
           <label>Cast :</label><span class="cast">${Actors}</span><br><br>
           <label>Director :</label><span class="Director">${Director}</span><br><br>
           <label>Language :</label><span class="Language">${Language}</span><br><br>
           <label>Country :</label><span class="Country">${Country}</span><br><br>
           <label>Box-Office :</label><span class="Box">${BoxOffice}</span><br><br>
           <label>Plot :</label><span class="plot">${Plot}</span><br><br>
          
       </div>
   </div>
</div>`

}

async function fetchMovieDetails(imdbID) {
    let Res = await fetch(`http://www.omdbapi.com/?apikey=148c199&i=${imdbID}`)
    let ResultByID = await Res.json()
    displayResult(ResultByID);
}

searchBtn.addEventListener('click', async () => {
    let keyword = searchInput.value;
    searchInput.value = "";
    let resultData = await fetchMovieDataFromApi(keyword);

    displayResult(resultData)
    openPopup();


})

function openPopup() {
    document.getElementById('popupContainer').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}
