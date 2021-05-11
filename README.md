# learning-movie-db-correction
### 2) Afficher les résultats d'une recherche Ajax

- Créer
    - une page html
    - un fichier de style css
    - un fichier script.js
- Ajouter un champ de recherche <input>
- Ajouter un bouton <button>
- Lorsque vous cliquez sur ce bouton
    - Effectuer une requête HTTP pour récupérer ces informations ([https://developers.themoviedb.org/3/search/search-movies](https://developers.themoviedb.org/3/search/search-movies))
    - Afficher les 20 premiers films sur la page html (
        - Titre original
        - Synopsis
        - Date de sortie
        - Afficher la photo du poster
    - Afficher également le **nombre** des résultats
- Si l'utilisateur n'a pas encore cliqué sur le bouton
    - Afficher le texte : 0 résultat
- Si le film n'est pas trouvé, afficher un message : Film not found

## ⭐ Bonus : Pagination

- Reprendre l'exercice 2)
- Si la recherche retourne plusieurs pages
    - Afficher en bas de la liste des résultats un système de pagination .
        - Lorsque l'utilisateur clique sur la 2eme page par exemple, on cache les 20 résultats affichés pour afficher les 20 résultats de la 2eme page.

    ℹ️ Utiliser [bootstrap](https://getbootstrap.com/docs/5.0/components/pagination/) peut etre utile ;)
