import "bootstrap";

// Catégorie sélectionnée
const searchButton = document.querySelector("#search-button");
const categorie = document.querySelector("#domaine");
const type = document.querySelector("#type");
const contenu = document.querySelector("#contenu");
searchButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (categorie.value === "Musique") {
    console.log("c'est de la musique")
  }
  else if (categorie.value === "Films" && type.value === "Artiste") {
    CallTmdb(contenu.value);
  }
  else if (categorie.value === "Films" && type.value === "Titre") {
    CallTmdb(contenu.value.replace(" ", "%20"));
  }
  else if (categorie.value === "Livres") {
    CallGoogleBooks(contenu.value);
  }
  else {
    console.log("Chelou");
  }
});

// Supprimer les résultats affichés précédemment
function deleteExistingResults() {
  const resultats = document.querySelector(".resultats");
  resultats.classList.remove("hidden");
  const resultatTitre = document.querySelector(".resultTitle");
  resultatTitre.classList.remove("hidden");
  const Ensembleresultats = document.querySelectorAll(".resultat");
  Ensembleresultats.forEach((resultat) => {
    resultat.parentNode.removeChild(resultat);
  });
}

// Si categorie = Musique Fetch le nom d'un artiste
function CallSpotify() {
  const artiste = document.querySelector("#item_artiste");
  //   fetch(`https://api.spotify.com/v1/search?q=${artiste.value}&type=artist&limit=5`, {
  //       method: "GET",
  //       headers: {
  //         "Authorization": "${spotifyKey}"
  //       },
  //     })
  //     .then(response => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.artists.items[0].name);
  //       const artisteName = `<h1>${data.artists.items[0].name}<br/></h1>`;
  //       artiste.insertAdjacentHTML("afterend", artisteName);
  //       const artisteImg = `<img src=${data.artists.items[0].images[0].url} height="100" width="100">`;
  //       artiste.insertAdjacentHTML("afterend", artisteImg);
  //     });
}

  // Fetch un film par nom
function CallTmdb(contenu) {
  const resultats = document.querySelector(".resultats")
  const movieKey = document.querySelector('.tmdb_key').dataset.tmdb;
  const description = document.querySelector("#item_description");
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=fr&query=${contenu}&page=1&include_adult=false`, {
     method: "GET",
     })
     .then(response => response.json())
     .then((data) => {
       deleteExistingResults();
       viderFormulaire();
       var compteur;
       for (compteur = 4; compteur >= 0; compteur--) {
         const thumbnail = movieThumbnail(data, compteur);
         const titre = data.results[compteur].title
         resultats.insertAdjacentHTML("afterbegin", `<div class="resultat" data-compteur="${compteur}"><img src="${thumbnail}" width="50%" height="80%" alt=""><p>${titre}</p></div>`);
         ClickItem("Films", data);
       }
     });
}

// Get Movie thumbnail
function movieThumbnail(data, compteur) {
  const posterPath = data.results[compteur].poster_path
  var thumbnail = "https://books.google.fr/googlebooks/images/no_cover_thumb.gif"
  const titre = data.results[compteur].title
  if (posterPath !== null) {
    thumbnail = `http://image.tmdb.org/t/p/w185${posterPath}`;
  }
  return thumbnail;
}

  // Fetch un livre par titre ou auteur
function CallGoogleBooks(contenu) {
  const resultats = document.querySelector(".resultats")
  const bookKey = document.querySelector('.googlebook_key').dataset.google;
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${contenu}&key=${bookKey}`, {
     method: "GET",
     })
     .then(response => response.json())
     .then((data) => {
       deleteExistingResults();
       viderFormulaire();
       var compteur;
       for (compteur = 4; compteur >= 0; compteur--) {
         const titre = data.items[compteur].volumeInfo.title;
         const thumbnail = bookThumbnail(data, compteur)
         // var thumbnail = "https://books.google.fr/googlebooks/images/no_cover_thumb.gif"
         // if (data.items[compteur].volumeInfo.imageLinks !== undefined) {
         //    thumbnail = data.items[compteur].volumeInfo.imageLinks.thumbnail;
         // }
         resultats.insertAdjacentHTML("afterbegin", `<div class="resultat" data-compteur="${compteur}"><img src="${thumbnail}" width="50%" height="80%" alt=""><p>${titre}</p></div>`);
         ClickItem("Livres", data);
       }
     });
}

// Get Book thumbnail
function bookThumbnail(data, compteur) {
   var thumbnail = "https://books.google.fr/googlebooks/images/no_cover_thumb.gif"
   if (data.items[compteur].volumeInfo.imageLinks !== undefined) {
      thumbnail = data.items[compteur].volumeInfo.imageLinks.thumbnail;
   }
  return thumbnail;
}

// Au clic sur un des 5 résultats, alimentation des données de l'item
function ClickItem(domaine, data) {
  const resultatsCliques = document.querySelectorAll(".resultat");
  var description = document.querySelector("#item_description");
  var titre = document.querySelector("#item_titre");
  var artiste = document.querySelector("#item_artiste");
  var categorie = document.querySelector("#item_categorie");
  var photo = document.querySelector("#item_photo");
  var idExterne = document.querySelector("#item_id_externe");
  if (resultatsCliques !== null) {
    resultatsCliques.forEach((resultat) => {
      resultat.addEventListener("click", (event) => {
        const index = event.currentTarget.dataset.compteur;
        if (domaine === "Films") {
          description.value = data.results[index].overview;
          titre.value = data.results[index].title;
          artiste.value = "A ajouter";
          photo.value = movieThumbnail(data, index);
          categorie.value = "Films";
          idExterne.value = data.results[index].id;
        }
        else if (domaine === "Livres") {
          description.value = data.items[index].volumeInfo.description;
          titre.value = data.items[index].volumeInfo.title + " - " + data.items[index].volumeInfo.subtitle;
          artiste.value = data.items[index].volumeInfo.authors[0];
          photo.value = bookThumbnail(data, index);
          categorie.value = "Livres";
          idExterne.value = data.items[index].id
        }
        else if (domaine === "Musique") {
          console.log("Musique");
        }
        else {
          console.log("chelou")
        }
      });
    });
  }
}

// A la recherche d'un nouvel item, vider les éléments précédemment renseignés
function viderFormulaire() {
  var description = document.querySelector("#item_description");
  var titre = document.querySelector("#item_titre");
  var artiste = document.querySelector("#item_artiste");
  var categorie = document.querySelector("#item_categorie");
  var photo = document.querySelector("#item_photo");
  var idExterne = document.querySelector("#item_id_externe");
  description.value = "";
  titre.value = "";
  artiste.value = "";
  photo.value = "";
  categorie.value = "";
  idExterne.value = "";
}
