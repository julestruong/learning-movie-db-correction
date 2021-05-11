const URL_API_KEY = "b8e16ff25f44004fe2ab5dedc9e0453e";
const URL_API_MOVIE_SEARCH = "https://api.themoviedb.org/3/search/movie/";
const URL_IMAGE_PREFIX = "https://image.tmdb.org/t/p/w200";

$(function () {
  // on crée tous nos sélecteurs d'élement ici, pour
  // les utiliser simplement plus tard.
  $searchInput = $("#search-input");
  $searchButton = $("#search-button");
  $resultsList = $(".results-list");
  $errorInputEmpty = $(".input-empty");
  $errorFilmNotFound = $(".film-not-found");
  $pagination= $("#pagination");

  /**
   * Cette fonction sera appelée lorsqu'on voudra afficher les films retournées par l'API.
   * Elle prend donc en paramètres un tableau de film
   * 
   * Exemple de code HTML que va générer cette fonction
   * <div>
   *    <div>
            <h3>Titre original</h3>
            <p><strong>Date de sortie</strong> : 26/02/2021 </p>
            <p><strong>Synopsis</strong> : <br>
              Cherry drifts from college dropout to army medic in Iraq -
              anchored only by his true love, Emily. But after returning from
              the war with PTSD, his life spirals into drugs and crime as he
              struggles to find his place in the world.
            </p>
          </div>
          <div>
            <img
              src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pwDvkDyaHEU9V7cApQhbcSJMG1w.jpg"
            />
          </div>
      </div>
   */
  let displayMovies = function (movies) {
    let movieToDisplay = "";

    movies.forEach((movie) => {
      movieToDisplay += '<div class="d-flex mb-4 movie justify-content-between">';
      movieToDisplay += "<div>";
      movieToDisplay += `<h3>${movie.original_title}</h3>`;
      movieToDisplay += movie.release_date ? `<p><strong>Date de sortie</strong> : ${movie.release_date} </p>` : "";
      movieToDisplay += movie.overview ? `<p class="synopsis"><strong>Synopsis</strong> : ${movie.overview} </p>`: "";
      movieToDisplay += `</div>`;
      movieToDisplay += `<div>`;
      movieToDisplay += movie.poster_path ? `<img src="${URL_IMAGE_PREFIX + movie.poster_path}" alt="image-${movie.id}">` : "";
      movieToDisplay += `</div>`;
      movieToDisplay += `</div>`;
    });

    $resultsList.append(movieToDisplay);

    return;
  };

  /**
   * Cette fonction exécute l'appel ajax.
   * Elle prend en parametre l'url qu'elle doit requeter.
   * 
   * @param {*} urlWithQuery 
   */
  let ajaxCall = function(urlWithQuery) {
    $.ajax({
      url: urlWithQuery,
      success: function (data) {
        $resultsList.empty();
        let movies = data.results;
        
        if (movies.length === 0) {
          // on cache l'erreur "champ est vide", au cas ou elle aurait été affiché
          $errorInputEmpty.addClass("d-none");
          // on affiche l'erreur "film not found"
          $errorFilmNotFound.removeClass("d-none");
          // on ne va pas plus loin, et on n'a pas besoin de retourner quoi
          // que ce soit, il faut simplement arreter la fonction
          return;
        }

        // dans le cas ou on a des movies :
        displayMovies(movies);
        displayPagination(data.page, data.total_pages);
      },
    });
  }

  /**
   * Cette fonction est la callback de l'event listener du clic sur un lien de pagination
   * En d'autres termes, elle s'exécute lorsqu'on clique sur une autre page.
   * 
   * @param {*} event 
   */
  let onClickChangePage = function (event) {
    // pas vu en cours, mais event est intéressant ici.
    // il permet notamment de récuperer l'id de l'élément sur lequel on a cliqué
    // pratique pour récuperer le numéro de la page 
    let page = event.target.id.substr(5);
    let movieSearched = $searchInput.val();
    let urlWithQuery = `${URL_API_MOVIE_SEARCH}?api_key=${URL_API_KEY}&query=${movieSearched}&language=fr-FR&page=${page}`;

    ajaxCall(urlWithQuery);
  };

  let displayPagination = function (currentPage, totalPages) {
    let paginationToDisplay = "";

    if (totalPages <= 1) {
      // si l'on a qu'une page, inutile d'afficher la pagination
      return;
    }

    if (totalPages > 1) {
      $pagination.empty();
      paginationToDisplay += `<nav aria-label="Page navigation example">
                              <ul class="pagination">`

      paginationToDisplay += currentPage > 1 ?`<li class="page-item"><a class="page-link" href="#" id="page-${currentPage-1}">Previous</a></li>` : '';

      if (totalPages <= 10) {
        for(let i = 1; i <= totalPages; i++) {
          paginationToDisplay += `<li class="page-item">
                                  <a class="page-link ${i===currentPage? 'current': ''}" href="#" id="page-${i}">${i}</a>
                                  </li>`
        }
      } else {
        let initialI = Math.max(1, currentPage - 5)
        let endI = Math.min(initialI + 9, totalPages);
        for(let i = initialI; i <= endI ; i++) {
          paginationToDisplay += `<li class="page-item">
                                  <a class="page-link ${i===currentPage? 'current': ''}" href="#" id="page-${i}">${i}</a>
                                  </li>`
        }
      } 
      
      console.log(currentPage, totalPages);
      paginationToDisplay += currentPage === totalPages ?'' : `<li class="page-item"><a class="page-link" href="#" id="page-${currentPage+1}">Next</a></li>`;


      paginationToDisplay += `</ul>
                              </nav>`;


      $pagination.append(paginationToDisplay);
      // on n'oublie surtout pas d'ajouter un écouteur d'évènement au clic sur les pages.
      $(".page-link").click(onClickChangePage);
    }

    return;
  }

  /**
   * Cette fonction est la callback qui s'exécute lorsqu'on aura cliqué sur le bouton "Lancer la recherche"
   */
  let onClickFunction = function () {
    let movieSearched = $searchInput.val();
    let urlWithQuery = `${URL_API_MOVIE_SEARCH}?api_key=${URL_API_KEY}&query=${movieSearched}&language=fr-FR`;

    // si la valeur de l'input est vide
    // équivalent à if (movieSearch === "" || movieSearch === null || movieSearched === undefined)
    if (!movieSearched) {
      // on cache l'erreur "film not found", au cas ou elle aurait été affichée
      $errorFilmNotFound.addClass("d-none");
      // on affiche l'erreur "champ vide"
      $errorInputEmpty.removeClass("d-none");
      // on s'arrete là, on ne fait pas d'appel Ajax
      return;
    }

    ajaxCall(urlWithQuery);
  };
  $searchButton.click(onClickFunction);
});
