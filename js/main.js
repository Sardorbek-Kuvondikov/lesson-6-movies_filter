// Movies List
const elResult = document.querySelector(".js-movies-result");
const alertNotFound = document.querySelector(".js-not-found");
const elTemplate = document.querySelector(".js-template").content;
const movieInformation = movies.slice(0, 50);

// runtime yani soat va minutni topish
const runtimeHourAndMin = (runtime) => {
  const hour = Math.floor(runtime / 60);
  const minuts = runtime % 60;
  return `${hour} hur ${minuts} min`;
};

const renderMovies = (array, node) => {
  const docFrg = new DocumentFragment();
  node.innerHTML = "";
  array.forEach((movie) => {
    const moviesClone = elTemplate.cloneNode(true);

    moviesClone.querySelector(
      ".js-img"
    ).src = `http://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`;
    moviesClone.querySelector(".js-img").alt = movie.Title;
    moviesClone.querySelector(".js-movies-title").textContent =
      movie.Title.toString().split(" ").length > 2
        ? movie.Title.toString().split(" ").slice(0, 2).join(" ")
        : movie.Title;
    moviesClone.querySelector(".js-movies-rating").textContent =
      movie.imdb_rating;
    moviesClone.querySelector(".js-movies-year").textContent = movie.movie_year;
    moviesClone
      .querySelector(".js-movies-year")
      .setAttribute("datetime", `${movie.movie_year}-12-20`);
    moviesClone.querySelector(".js-movies-time").textContent =
      runtimeHourAndMin(movie.runtime);
    moviesClone.querySelector(".js-movies-categories").textContent =
      movie.Categories.replaceAll("|", ", ");

    moviesClone.querySelector(".js-modal-btn").dataset.imdbId = movie.imdb_id;

    docFrg.appendChild(moviesClone);
  });
  node.appendChild(docFrg);
};
renderMovies(movieInformation, elResult);

// modal
const modal = document.querySelector(".js-modal");
const elMoviesVideos = modal.querySelector(".js-moda-video");
const elMoviesTitle = modal.querySelector(".js-modal-title");
const elMoviesRuntime = modal.querySelector(".js-modal-runtime");
const elMoviesYear = modal.querySelector(".js-modal-year");
const elMoviesHover = modal.querySelector(".js-modal-hour");
const elModalCatigory = modal.querySelector(".js-modal-catigory");
const elModalSummary = modal.querySelector(".js-modal-summary");
const elModalLink = document.querySelector(".js-movies-link");

const moviesRenderModal = (findMovies) => {
  elMoviesVideos.src = `https://www.youtube-nocookie.com/embed/${findMovies.ytid}`;
  elMoviesVideos.alt = findMovies.Title;
  elMoviesTitle.textContent = findMovies.Title;
  elMoviesRuntime.textContent = findMovies.imdb_rating;
  elMoviesYear.textContent = findMovies.movie_year;
  elMoviesYear.setAttribute("datatime", `${findMovies.movie_year}-12-20`);
  elMoviesHover.textContent = runtimeHourAndMin(findMovies.runtime);
  elModalCatigory.textContent = findMovies.Categories.replaceAll("|", ", ");
  elModalSummary.textContent =
    findMovies.summary.split(" ").length > 10
      ? findMovies.summary.split(" ").slice(0, 80).join(" ")
      : findMovies.summary;
  elModalLink.href = `https://www.imdb.com/title/${findMovies.imdb_id}/`;
};

elResult.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (evt.target.matches(".js-modal-btn")) {
    const imdModal = evt.target.dataset.imdbId;
    modal.style.display = "block";
    movies.find((item) => {
      if (item.imdb_id === imdModal) {
        moviesRenderModal(item);
      }
    });
  }
});

// modal yopilish buttoni
const modalClosy = document.querySelector(".js-modal-control");

modalClosy.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal.style.display = "none";
});

// search
const elform = document.querySelector(".js-movies-form");
const elMoviesInput = elform.querySelector(".js-movies-input");
const elmoviesUnicCotygory = elform.querySelector(".js-movies-catigory");

elform.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValeu = elMoviesInput.value.trim();
  const categoruValue = elmoviesUnicCotygory.value;
  const regexMovies = new RegExp(inputValeu, "gi");

  const searchMovies = movies.filter((item) => {
    return (
      String(item.Title).match(regexMovies) &&
      (categoruValue == "all" || item.Categories.includes(categoruValue))
    );
  });
  console.log(searchMovies);
  if (searchMovies.length > 0) {
    renderMovies(searchMovies, elResult);
    alertNotFound.classList.add("hidden");
  } else {
    renderMovies(searchMovies, elResult);
    alertNotFound.classList.remove("hidden");
  }
});

// unic category
function handleCategprie(arr) {
  let categorieArr = [];
  arr.forEach((item) => {
    let categories = item.Categories.split("|");
    categories.forEach((item) => {
      if (!categorieArr.includes(item)) {
        categorieArr.push(item);
      }
    });
  });
  return categorieArr;
}
// category render
function handleCategprieOpt() {
  let result = handleCategprie(movies);
  const newOptDocumentFragment = document.createDocumentFragment();

  result.forEach((item) => {
    const newCreateOption = document.createElement("option");
    newCreateOption.textContent = item;
    newCreateOption.value = item;
    newOptDocumentFragment.appendChild(newCreateOption);
  });
  elmoviesUnicCotygory.appendChild(newOptDocumentFragment);
}
handleCategprieOpt();
