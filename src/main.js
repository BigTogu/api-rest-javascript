async function getTrendingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await res.json();
  const movies = data.results;

  const moviesSection = document.getElementById("movies-container");
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
    moviesSection.appendChild(movieCard);
    movieCard.appendChild(titleMovie);
    movieCard.appendChild(imageMovie);

    //CSS
    titleMovie.classList.add("font-bold", "text-base");
    movieCard.classList.add("flex-shrink-0", "w-44", "h-40", "rounded-xs");
    imageMovie.classList.add(
      "w-full",
      "h-full",
      "rounded-[10px]",
      "object-cover"
    );
  });
}

let scrolling;

function animationRotate() {
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
      }, 100);
    }
  }, 100);
}

getTrendingMovies();
