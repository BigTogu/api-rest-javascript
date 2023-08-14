let scrolling;

function animationRotate() {
  const movieCards = document.getElementsByClassName("flex-shrink-0");

  //Add class while scrolling
  for (let i = 0; i < movieCards.length; i++) {
    movieCards[i].classList.add("card-animation");
    movieCards[i].classList.remove("card-animation-out");
  }

  //clear timeout scrolling set before
  // clearTimeout(scrolling);

  //set timeout to know if it is scrolling or not
  scrolling = setTimeout(function () {
    //remove class while not scrolling
    for (let i = 0; i < movieCards.length; i++) {
      movieCards[i].classList.add("card-animation-out");
      movieCards[i].classList.remove("card-animation");

      //set timeout to remove class after animation
      setTimeout(function () {
        movieCards[i].classList.remove("card-animation-out");
      }, 500);
    }
  }, 1000);
}
