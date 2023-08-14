navigationButton.addEventListener("click", () => {
  location.hash = "#search";
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  //leer hash y mostrar la pantalla correspondiente

  if (location.hash.startsWith("#/trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#/search")) {
    searchPage();
  } else if (location.hash.startsWith("#/movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#/category=")) {
    searchPage();
  } else {
    homePage();
  }

  return;
}

//hay que poner los elementos que quitamos o dejamos según la pagina
function homePage() {
  // HeaderSection.classList.remove("hidden");
  // SearchSection.classList.remove("inactive");
  // CategoriesSection.classList.add("inactive");
  console.log("home");
}

function categoriesPage() {
  console.log("category");
}

function movieDetailsPage() {
  console.log("movie");
}

function searchPage() {
  console.log("search");
}

function trendsPage() {
  console.log("trends");
}
