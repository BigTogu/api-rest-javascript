navigationButton.addEventListener("click", () => {
  //searchInput.value
  const replacedQuery = searchInput.value.replace(" ", "+");
  location.hash = `#search=${replacedQuery.trim()}`;
  //para evitar espacios en blanco al principio-fin
});

//history.back

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  //leer hash y mostrar la pantalla correspondiente
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search")) {
    console.log("Hola");
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

  //para volver al top en cada página
  document.body.scrollTop = 0;
  //para otros navegadores
  document.documentElement.scrollTop = 0;
  return;
}

//hay que poner los elementos que quitamos o dejamos según la pagina
function homePage() {
  // HeaderSection.classList.remove("hidden");
  // SearchSection.classList.remove("inactive");
  // CategoriesSection.classList.add("inactive");
}

function categoriesPage() {
  //limpiar la pagina de secciones
  moviesTrendingContainer.classList.add("inactive");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  categoriesContainer.classList.add("inactive");
  title.classList.add("inactive");
  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");

  //añadir titulo categoria
  headerCategoryTitle.innerHTML = categoryName;
  getFilteredCategory(categoryId);
}

function movieDetailsPage() {
  // headerSection.classList.add("bg-red-500");
  // headerSection.classList.remove("bg-gradient-to-r");
  // headerTitle.classList.add("inactive");
  // headerSearchTitle.classList.remove("inactive");
  // categoriesContainer.classList.add("inactive");
  // title.classList.add("inactive");
}

function searchPage() {
  //limpiar la pagina de secciones
  moviesTrendingContainer.classList.add("inactive");
  headerTitle.classList.add("inactive");
  headerSearchTitle.classList.remove("inactive");
  categoriesContainer.classList.add("inactive");
  title.classList.add("inactive");
  const [_, query] = location.hash.split("=");
  const replacedQuery = query.replace("%20", "+");
  console.log(replacedQuery, "replacequery");

  //añadir titulo categoria
  headerCategoryTitle.innerHTML = searchInput.value;
  getMoviesBySearch(query);
}

function trendsPage() {}
