const URL_API_KEY = "b8e16ff25f44004fe2ab5dedc9e0453e";
const URL_API_MOVIE_SEARCH = "https://api.themoviedb.org/3/search/movie/";

$(function () {
  // on crée tous nos sélecteurs d'élement ici, pour 
  // les utiliser simplement plus tard.
  $searchInput = $("#search-input");
  $searchButton = $("#search-button");
  $resultsList = $(".results-list");
  $errorInputEmpty = $(".input-empty");
  $errorFilmNotFound = $(".film-not-found");

  let onClickFunction = function () {
    let movieSearched = $searchInput.val();
    let urlWithQuery = `${URL_API_MOVIE_SEARCH}?api_key=${URL_API_KEY}&query=${movieSearched}&language=fr-FR`;

    // si la valeur de l'input est vide 
    // équivalent à if (movieSearch === "" || movieSearch === null || movieSearched === undefined)
    if (!movieSearched) {
      // on cache l'erreur "film not found", au cas ou elle aurait été affichée
      $errorFilmNotFound.addClass('d-none');
      // on affiche l'erreur "champ vide"
      $errorInputEmpty.removeClass('d-none');
      // on s'arrete là, on ne fait pas d'appel Ajax
      return ;
    }

    console.log(urlWithQuery);
    $.ajax({
      url: urlWithQuery,
      success: function (data, textStatus, jqXHR) {
        $resultsList.empty();
        let movies = data.results;

        if (movies.length === 0) {
          // on cache l'erreur "champ est vide", au cas ou elle aurait été affiché
          $errorInputEmpty.addClass('d-none');
          // on affiche l'erreur "film not found"
          $errorFilmNotFound.removeClass('d-none');
          // on ne va pas plus loin, et on n'a pas besoin de retourner quoi 
          // que ce soit, il faut simplement arreter la fonction
          return;
        }
      },
    });
  }
  $searchButton.click(onClickFunction);
});
