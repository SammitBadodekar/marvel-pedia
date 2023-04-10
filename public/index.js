setTimeout(() => {
  document.getElementById("preloader").style.display = "none";
}, 2000);
function scrollToSection(id) {
  var element = document.getElementById(id);
  element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

document.addEventListener("click", function (event) {
  if (
    event.target.matches("a") ||
    event.target.matches("img") ||
    event.target.matches("h4")
  ) {
    document.getElementById("preloader").style.display = "flex";
    setTimeout(() => {
      document.getElementById("preloader").style.display = "none";
    }, 5000);
  }
});

/* search inputs and results */
let searchBox = document.getElementById("search-box");
let searchResults = document.getElementById("search-result");
searchBox.addEventListener("input", async () => {
  searchResultsHtml.style.display = "grid";
    let searchInputs = searchBox.value;
    if (searchInputs === "") {
      searchResults.innerHTML = "";
    } else {
      searchResults.innerHTML = "Searching...";
    }
    searchResults.innerHTML = "";
    let rawCharNameData = await fetch(`/characters?query=${searchInputs}`);
    let charNameData = await rawCharNameData.json();
    const charNames = Object.entries(charNameData);
    for(i=1;i<6;i++){
        searchResults.innerHTML += `<p><a href="/character-info?query=${charNames[i][1].id}">${charNames[i][1].name}</a></p>`;
    }
    let rawComicsNameData = await fetch(`/comics?query=${searchInputs}`);
    let comicsNameData = await rawComicsNameData.json();
    const comNames = Object.entries(comicsNameData);
    for(i=1;i<6;i++){
        searchResults.innerHTML += `<p><a href="/comics-info?query=${comNames[i][1].id}">${comNames[i][1].title}</a></p>`;
    }
    let rawEventsNameData = await fetch(`/events?query=${searchInputs}`);
    let EventsNameData = await rawEventsNameData.json();
    const EventsNames = Object.entries(EventsNameData);
    for(i=1;i<6;i++){
        searchResults.innerHTML += `<p><a href="/events-info?query=${EventsNames[i][1].title}">${EventsNames[i][1].title}</a></p>`;
    }
});

let characterContent = document.getElementById("character");
async function randomCaracters() {
  let rawRandonChar = await fetch(
    `/random-characters?query=${getRandomCharacters()}`
  );
  let charNameData = await rawRandonChar.json();
  const charNames = Object.entries(charNameData);
  for (i = 0; i < 30; i++) {
    if (
      charNames[i][1].thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
      charNames[i][1].thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
    ) {
      continue;
    }
    characterContent.innerHTML += `<a href="/character-info?query=${charNames[i][1].id}" id="characters">
        <img src="${charNames[i][1].thumbnail.path}.${charNames[i][1].thumbnail.extension}" alt="">
        <h4>${charNames[i][1].name}</h4></a>`;
  }
}
randomCaracters();

/* For generating random comics */
let comicContent = document.getElementById("comics");
async function randomComics() {
  let rawRandonChar = await fetch(`/random-comics?query=${getRandomComics()}`);
  let charNameData = await rawRandonChar.json();
  const charNames = Object.entries(charNameData);
  for (i = 0; i < 30; i++) {
    if (
      charNames[i][1].thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
      charNames[i][1].thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
    ) {
      continue;
    }
    comicContent.innerHTML += `<a href="/comics-info?query=${charNames[i][1].id}" id="characters">
        <img src="${charNames[i][1].thumbnail.path}.${charNames[i][1].thumbnail.extension}" alt="">
        <h4>${charNames[i][1].title}</h4></a>`;
  }
}
randomComics();
/* For generating random events */
let eventsContent = document.getElementById("events");
async function randomEvents() {
  let rawRandomEvents = await fetch(
    `/random-events?query=${getRandomEvents()}`
  );
  let eventsNameData = await rawRandomEvents.json();
  const charNames = Object.entries(eventsNameData);
  for (i = 0; i < 30; i++) {
    if (
      charNames[i][1].thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
      charNames[i][1].thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
    ) {
      continue;
    }
    eventsContent.innerHTML += `<a href="/events-info?query=${charNames[i][1].title}" id="characters">
        <img src="${charNames[i][1].thumbnail.path}.${charNames[i][1].thumbnail.extension}" alt="">
        <h4>${charNames[i][1].title}</h4></a>`;
  }
}
randomEvents();
const movies = [
  "Iron man",
  "The Incredible Hulk",
  "Iron Man 2",
  "Thor",
  "Captain America: The First Avenger",
  "The Avengers",
  "Iron Man 3",
  "Thor: The Dark World",
  "Captain America: The Winter Soldier",
  "Guardians of the Galaxy",
  "Avengers: Age of Ultron",
  "Captain America: Civil War",
  "Doctor Strange",
  "Guardians of the Galaxy Vol. 2",
  "Spider-Man Homecoming",
  "Thor: Ragnarok",
  "Black Panther",
  "Avengers: Infinity War",
  "Ant-Man and the Wasp",
  "Captain Marvel",
  "Avengers: Endgame",
  "Spider-Man: Far from Home",
  "Black Widow",
  "Shang-Chi and the Legend of the Ten Rings",
  "Eternals",
  "Spider-Man: No Way Home",
  "Doctor Strange in the Multiverse of Madness",
  "Thor: Love and Thunder",
  "Black panther Wakanda Forever",
  "Ant-Man and the Wasp: Quantumania",
];
const tvShows = [
  "Wandavision",
  "The Falcon and the Winter Soldier",
  "Loki",
  "What if...?",
  "Hawkeye",
  "Moon Knight",
  "Ms Marvel",
  "I Am Groot",
  "The Guardians of the Galaxy: Holiday Special",
];
let moviesContainer = document.getElementById("movies");
let tvShowsContainer = document.getElementById("tv-shows");
movies.forEach((element) => {
  async function moviesData() {
    let rawCharNameData = await fetch(
      `https://www.omdbapi.com/?t=${element}&apikey=a664b916`
    );
    let charNameData = await rawCharNameData.json();
    let moviesInfo = Object.values(charNameData);
    searchResults.innerHTML = "";
    moviesContainer.innerHTML += `
    <a href="/movies-info?query=${moviesInfo[0]}">
    <img src="${moviesInfo[13]}" alt="" class="movie-img">
    <p>${moviesInfo[0]}</p>
    </a>`;
  }
  moviesData();
});
tvShows.forEach((element) => {
  async function moviesData() {
    let rawCharNameData = await fetch(
      `https://www.omdbapi.com/?t=${element}&apikey=a664b916`
    );
    let charNameData = await rawCharNameData.json();
    let moviesInfo = Object.values(charNameData);
    searchResults.innerHTML = "";
    tvShowsContainer.innerHTML += `
    <a href="/movies-info?query=${moviesInfo[0]}">
    <img src="${moviesInfo[13]}" alt="" class="movie-img">
    <p>${moviesInfo[0]}</p>
    </a>`;
  }
  moviesData();
});

/* loading animation */
let body = document.querySelector("body");
let searchResultsHtml = document.getElementById("search-result");
body.addEventListener("click", () => {
  searchResultsHtml.style.display = "none";
});
/* functions for giving offsets for characters/comics/events */
function getRandomCharacters() {
  return Math.floor(Math.random() * 1500);
}
function getRandomComics() {
  return Math.floor(Math.random() * 40000);
}
function getRandomEvents() {
  return Math.floor(Math.random() * 72);
}
