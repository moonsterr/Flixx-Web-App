const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: 'ccc95151df8296d44d9e7bdd92508023',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

function showActive() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

async function displayPopularMovies() {
  const { results } = await getFetchData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    // addItemToStorage(movie.id);
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                  />`
                  : `
                  <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title"> ${movie.title}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
              </p>
            </div>`;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function displayPopularShows() {
  const { results } = await getFetchData('tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
              ${
                show.poster_path
                  ? `<img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
                  />`
                  : `
                  <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title"> ${show.name}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${
                  show.first_air_date
                }</small>
              </p>
            </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  addItemToStorage(movieId);
  const credits = await getFetchData(`movie/${movieId}/credits`);
  console.log(credits);

  const movie = await getFetchData(`movie/${movieId}`);

  console.log(movie);

  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
            <div>
              ${
                movie.poster_path
                  ? `<img
                // src= "https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt=${movie.title}
              />`
                  : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            /> `
              }
            </div>
            <div>
              <h2>${movie.title}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                ${movie.vote_average}/ 10
              </p>
              <p class="text-muted">Release Date: ${movie.release_date}</p>
              <p>
                ${movie.overview}
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
                  ${movie.genres
                    .map((genre) => `<li>${genre.name}</li>`)
                    .join('    ')}
              </ul>
              <a href=${
                movie.homepage
              } target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
          </div>
          <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
              <li><span class="text-secondary">Budget:</span> ${
                movie.budget
              }</li>
              <li><span class="text-secondary">Revenue:</span> ${
                movie.revenue
              }</li>
              <li><span class="text-secondary">Runtime:</span> ${
                movie.runtime
              }</li>
              <li><span class="text-secondary">Status:</span> ${
                movie.status
              }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
            ${movie.production_companies
              .map((company) => company.name)
              .join('   ')}
            </div>
            <h4>Production Countries</h4>
            <div class="list-group">
            
            ${movie.production_countries
              .map((country) => country.name)
              .join('   ')}
            </div>
            <div class="list-group">
            <h4>Cast</h4>
             ${credits.cast
               .map(
                 (person) =>
                   `<a href="cast-details.html?id=${person.id}" class="list-group-item">${person.name}</a>`
               )
               .join('')}
            </div>
          `;
  document.querySelector('#movie-details').appendChild(div);
}

async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];
  addItemToStorage(showId);
  const show = await getFetchData(`tv/${showId}`);
  const credits = await getFetchData(`tv/${showId}/credits`);
  console.log(credits);

  console.log(show);
  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
            <div>
              ${
                show.poster_path
                  ? `<img
                  src= "https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt=${show.name}
              />`
                  : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="show Title"
            /> `
              }
            </div>
            <div>
              <h2>${show.name}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                ${show.vote_average}/ 10
              </p>
              <p class="text-muted">Release Date: ${show.first_air_date}</p>
              <p>
                ${show.overview}
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
                  ${show.genres
                    .map((genre) => `<li>${genre.name}</li>`)
                    .join('')}
              </ul>
              <a href=${
                show.homepage
              } target="_blank" class="btn">Visit show Homepage</a>
            </div>
          </div>
          <div class="details-bottom">
            <h2>show Info</h2>
            <ul>
              <li><span class="text-secondary">Budget:</span> ${
                show.budget ? show.budget : 'No budget'
              }</li>
              <li><span class="text-secondary">Revenue:</span> ${
                show.revenue ? show.revenue : 'No revenue'
              }</li>
              <li><span class="text-secondary">Runtime:</span> ${
                show.runtime ? show.runtime : 'No runtime'
              }</li>
              <li><span class="text-secondary">Status:</span> ${
                show.status
              }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
            ${show.production_companies
              .map((company) => company.name)
              .join('   ')}
            </div>
            <h4>Production Countries</h4>
            <div class="list-group">
            ${show.production_countries
              .map((country) => country.name)
              .join('   ')}
            </div>
            <div class="list-group">
            <h4>Cast</h4>
             ${credits.cast
               .map(
                 (person) =>
                   `<a href="cast-details.html?id=${person.id}" class="list-group-item">${person.name}</a>`
               )
               .join('')}
            </div>
          </div>
          `;
  document.querySelector('#show-details').appendChild(div);
}

async function displayCastDetail() {
  const personId = window.location.search.split('=')[1];
  console.log(personId);
  const person = await getFetchData(`person/${personId}`);
  console.log(person);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top"> 
    <div>
         ${
           person.profile_path
             ? `<img
                  src= "https://image.tmdb.org/t/p/w500${person.profile_path}"
                class="card-img-top"
                alt=${person.name}
              />`
             : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="show Title"
            /> `
         }
      </div>
    <div>
      <h2>${person.name} </h2>
      <p>
       <i class="fas fa-star text-primary"></i>
        ${person.popularity}/ 10
      </p>
      <p class="text-muted">Birth:  ${person.birthday}</p>
      <p>Place of Birth: ${person.place_of_birth}</P>
      ${
        person.deathday
          ? `<p>Died: ${person.deathday}</p>`
          : `<p> Status: Alive`
      }
      <p>
      ${person.biography}
      </p>
      <p>Known By:  ${person.also_known_as}</p>
  </div>
  `;
  document.querySelector('#cast-details').appendChild(div);
}

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100%';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = ' 0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else if (type === 'show') {
    document.querySelector('#show-details').appendChild(overlayDiv);
  } else if (type === 'cast') {
    document.querySelector('#cast-details').appendChild(overlayDiv);
  }
}

async function displaySlider() {
  const { results } = await getFetchData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `

            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average}
            </h4>`;
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

async function displayRecSlider() {
  const movieIds = JSON.parse(localStorage.getItem('ids'));

  if (movieIds !== null) {
    for (let mId of movieIds) {
      const movie = await getFetchData(`movie/${mId}`);
      const nb_2 = document.querySelector('.nb-2');
      nb_2.style.display = 'block';
      const div = document.createElement('div');
      div.classList.add('swiper-slide');

      div.innerHTML = `

      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average}
      </h4>`;
      document.querySelector('.swiper-wrapper-continue').appendChild(div);
    }
  } else {
    const nb_2 = document.querySelector('.nb-2');
    nb_2.style.display = 'none';
  }
  initSwiper2();
}
function getItemsFromstorage() {
  let itemsFromStorage;
  if (localStorage.getItem('ids') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('ids'));
  }
  return itemsFromStorage;
}
function addItemToStorage(id) {
  let itemsFromStorage = getItemsFromstorage();

  if (itemsFromStorage.length >= 10) {
    itemsFromStorage.shift();
  }

  if (!itemsFromStorage.includes(id)) {
    itemsFromStorage.push(id);
  }
  localStorage.setItem('ids', JSON.stringify(itemsFromStorage));
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    // loop: true,
    autoplay: {
      delay: 1250,
      disableOnInteraction: true,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

function initSwiper2() {
  const swiper = new Swiper('.swiper-2', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    // loop: true,
    // autoplay: {
    //   delay: 1250,
    //   disableOnInteraction: true,
    // },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

async function getFetchData(endpoint) {
  const apiUrl = 'https://api.themoviedb.org/3/';
  const apiKey = 'ccc95151df8296d44d9e7bdd92508023';

  try {
    showSpinner();
    const Fetch = await fetch(
      `${apiUrl}${endpoint}?api_key=${apiKey}&language=en=US`
    );

    if (!Fetch.ok) {
      throw new Error('something went wrong');
    }
    const response = await Fetch.json();

    // console.log(response.results);
    hideSpinner();
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function searchApiData() {
  const apiUrl = global.api.apiUrl;
  const apiKey = global.api.apiKey;

  try {
    showSpinner();
    const Fetch = await fetch(
      `${apiUrl}search/${global.search.type}?api_key=${apiKey}&language=en=US&query=${global.search.term}&page=${global.search.page}`
    );

    if (!Fetch.ok) {
      throw new Error('something went wrong');
    }
    const response = await Fetch.json();

    // console.log(response.results);
    hideSpinner();
    return response;
  } catch (error) {
    console.log(error);
  }
}

function showSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('show');
}
function hideSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.remove('show');
}

async function search() {
  const queryString = window.location.search;
  const url = new URLSearchParams(queryString);

  global.search.term = url.get('search-term');
  global.search.type = url.get('type');
  if ((global.search.term != '') & (global.search.term != null)) {
    const result = await searchApiData();

    global.search.page = result.page;
    global.search.totalPages = result.total_pages;
    global.search.totalResults = result.total_results;

    if (result.results.length === 0) {
      setAlert('No results', 'alert-success');
    }
    displaySearchResults(result.results);
  } else {
    setAlert('Please enter something to search');
  }
}

function displaySearchResults(results) {
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';
  results.forEach((film) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="${global.search.type}-details.html?id=${film.id}">
    ${
      film.poster_path
        ? `<img
          src="https://image.tmdb.org/t/p/w500${film.poster_path}"
          class="card-img-top"
          alt="${global.search.type === 'movie' ? film.title : film.name}"
        />`
        : `
        <img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${global.search.type === 'movie' ? film.title : film.name}"
  />`
    }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === 'movie' ? film.title : film.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === 'movie'
                  ? film.release_date
                  : film.first_air_date
              }</small>
            </p>`;

    document.querySelector(
      '#search-results-heading'
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>`;
    document.querySelector('#search-results').appendChild(div);
  });

  displayPagination();
}

function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');

  div.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">${global.search.page} of ${global.search.totalPages}</div>
        `;

  document.getElementById('pagination').appendChild(div);

  if (global.search.page === 1) {
    document
      .getElementById('pagination')
      .querySelector('#prev').disabled = true;
  }
  if (global.search.page === global.search.totalPages) {
    document
      .getElementById('pagination')
      .querySelector('#next').disabled = true;
  }

  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchApiData();
    displaySearchResults(results);
  });

  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchApiData();
    displaySearchResults(results);
  });
}

function setAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.getElementById('alert').appendChild(alertEl);

  setTimeout(() => {
    document.getElementById('alert').removeChild(alertEl);
  }, 3000);
}

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      displaySlider();
      displayRecSlider();
      break;
    case '/shows.html':
      console.log('Show page');
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
    case '/cast-details.html':
      displayCastDetail();
      break;
  }

  showActive();
}

// getFetchData('people');

document.addEventListener('DOMContentLoaded', init);
