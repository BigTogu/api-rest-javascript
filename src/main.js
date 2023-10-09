const colorsId = {
  28: "#F59E0B",
  12: "#EF4444",
  16: "#10B981",
  35: "#3B82F6",
  80: "#6366F1",
  99: "#8B5CF6",
  18: "#A855F7",
  10751: "#F59E0B",
  14: "#EF4444",
  36: "#10B981",
  27: "#3B82F6",
  10402: "#6366F1",
  9648: "#8B5CF6",
  10749: "#A855F7",
  878: "#F59E0B",
  10770: "#EF4444",
  53: "#10B981",
  10752: "#3B82F6",
  37: "#6366F1",
};
let scrolling;

const createMovies = (movies, container) => {
  container.innerHTML = ""; //limpiar secciones

  movies.forEach((movie) => {
    //Create elements HTML
    const movieCard = document.createElement("div");
    const titleMovie = document.createElement("p");
    const imageMovie = document.createElement("img");

    //ATRIBUTES IMG
    imageMovie.setAttribute("alt", movie.original_title);
    imageMovie.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );

    //Appenchild to html
    container.appendChild(movieCard);
    //movieCard.appendChild(titleMovie);
    movieCard.appendChild(imageMovie);

    //CSS
    //titleMovie.classList.add("font-bold", "text-base");
    movieCard.classList.add(
      "flex-shrink-0",
      "w-32",
      "h-52",
      "rounded-md",
      "flex",
      "items-center",
      "mt-5"
    );
    imageMovie.classList.add(
      "w-full",
      "h-full",
      "items-center",
      "rounded-md",
      "object-cover"
    );

    movieCard.style.boxShadow = "rgb(248, 246, 257, 0.05) 4px -3px 11px 0px";

    movieCard.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;

      headerSection.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280${movie.poster_path}")`;

      headerSection.style.backgroundSize = "cover";
      headerSection.style.backgroundPosition = "center 35%";

      headerSection.classList.remove("bg-gradient-to-r");
      headerTitle.classList.add("inactive");
      headerSearchTitle.classList.remove("inactive");
      categoriesContainer.classList.add("inactive");
      title.classList.add("inactive");
    });
  });
};

async function getTrendingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await res.json();
  const movies = data.results;
  const headerSection = document.getElementById("header");
  if (movies[0] && movies[0].poster_path) {
    headerSection.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280${movies[0].poster_path}")`;
    headerSection.style.backgroundSize = "cover";
    headerSection.style.backgroundPosition = "center 35%";
  }

  createMovies(movies, moviesContainer);
}

async function getCategoriesMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await res.json();
  const categoriesMovies = data.genres;

  categoriesList.innerHTML = "";
  categoriesMovies.forEach((categoryMovie) => {
    //Create elements HTML
    const categoryCard = document.createElement("div");
    const categoryColor = document.createElement("div");
    const categoryName = document.createElement("p");

    const color = colorsId[categoryMovie.id];

    //Add Text to element p
    categoryName.innerText = categoryMovie.name;

    //Appenchild to html
    categoriesList.appendChild(categoryCard);
    categoryCard.appendChild(categoryColor);
    categoryCard.appendChild(categoryName);

    //CSS
    categoryCard.classList.add("flex", "flex-row", "items-center");
    categoryName.classList.add(
      "font-medium",
      "text-base",
      "rounded-2xl",
      "bg-[#1E293B]",
      "py-2",
      "px-4"
    );

    const originalBgColor = "#1E293B";

    // Cambia el color de fondo de categoryName cuando el mouse entra en categoryCard
    categoryCard.addEventListener("mouseover", () => {
      categoryName.style.backgroundColor = color;
    });

    // Revierte el color de fondo de categoryName cuando el mouse sale de categoryCard
    categoryCard.addEventListener("mouseout", () => {
      categoryName.style.backgroundColor = originalBgColor;
    });
    // categoryColor.classList.add(
    //   "w-6",
    //   "h-6",
    //   "rounded",
    //   "m-2",
    //   `bg-[${color}]`
    // );

    //Add Event Click on Title
    categoryName.addEventListener("click", () => {
      location.hash = `#category=${categoryMovie.id}-${categoryMovie.name}`;
    });
  });
}

//crear el html de la nueva sección y hacer función reutilizable
async function getFilteredCategory(categoryId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`
  );
  const data = await res.json();
  const movies = data.results;

  createMovies(movies, moviesCategoryCards);
}

async function getMoviesBySearch(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
  );
  const data = await res.json();
  const movies = data.results;
  console.log(movies, "movies");

  createMovies(movies, moviesSearchCards);
}

function animationRotate() {
  console.log("hola ");

  const movieCards = document.getElementsByClassName("flex-shrink-0");
  //Add class while scrolling
  for (let i = 0; i < movieCards.length; i++) {
    movieCards[i].classList.add("card-animation");
    movieCards[i].classList.remove("card-animation-out");
  }

  //clear timeout scrolling set before
  clearTimeout(scrolling);

  //set timeout to know if it is scrolling or not
  scrolling = setTimeout(function () {
    //remove class while not scrolling
    for (let i = 0; i < movieCards.length; i++) {
      movieCards[i].classList.add("card-animation-out");
      movieCards[i].classList.remove("card-animation");

      //set timeout to remove class after animation
      setTimeout(function () {
        movieCards[i].classList.remove("card-animation-out");
      }, 300);
    }
  }, 300);
}

getTrendingMovies();
getCategoriesMovies();
