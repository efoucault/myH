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
    console.log(contenu.value.replace(" ", "%20"));
    CallTmdb(contenu.value.replace(" ", "%20"));
  }
  else if (categorie.value === "Livres") {
    CallGoogleBooks(contenu.value);
  }
  else {
    console.log("Chelou");
  }
});

// Si categorie = Musique Fetch le nom d'un artiste
function CallSpotify() {
  const artiste = document.querySelector("#item_artiste");
  artiste.addEventListener('blur', (evt) => {
    evt.preventDefault();
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
  });
}

  // Fetch un film par nom
function CallTmdb(contenu) {
  const resultats = document.querySelector(".resultats")
  const movieKey = document.querySelector('.tmdb_key').dataset.tmdb;
  const commentaire = document.querySelector("#item_commentaire");
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=fr&query=${contenu}&page=1&include_adult=false`, {
     method: "GET",
     })
     .then(response => response.json())
     .then((data) => {
       console.log(data.results[0].poster_path);
       var compteur;
       for (compteur = 4; compteur >= 0; compteur--) {
         const posterPath = data.results[compteur].poster_path
         var thumbnail = "https://books.google.fr/googlebooks/images/no_cover_thumb.gif"
         const titre = data.results[compteur].title
         if (posterPath !== null) {
           thumbnail = `http://image.tmdb.org/t/p/w185${posterPath}`;
           console.log(thumbnail)
         }
         resultats.insertAdjacentHTML("afterbegin", `<div class="resultat" data-compteur="${compteur}"><img src="${thumbnail}" width="50%" height="80%" alt=""><p>${titre}</p></div>`);
         commentaire.value = data.results[0].overview;
       }
     });
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
       // console.log(`https://www.googleapis.com/books/v1/volumes?q=${contenu}&key=${bookKey}`);
       var compteur;
       for (compteur = 4; compteur >= 0; compteur--) {
        // Runs 5 times, with values of step 0 through 4.
         const titre = data.items[compteur].volumeInfo.title;
         // console.log(data.items[compteur].volumeInfo.imageLinks)
         var thumbnail = "https://books.google.fr/googlebooks/images/no_cover_thumb.gif"
         if (data.items[compteur].volumeInfo.imageLinks !== undefined) {
            thumbnail = data.items[compteur].volumeInfo.imageLinks.thumbnail;
         }
         // console.log(data.items[compteur].volumeInfo.subtitle);
         // console.log(data.items[compteur].volumeInfo.description);
         resultats.insertAdjacentHTML("afterbegin", `<div class="resultat" data-compteur="${compteur}"><img src="${thumbnail}" width="50%" height="80%" alt=""><p>${titre}</p></div>`);
         ClickItem(data);
       }
     });
}

// Clic sur un résultat
function ClickItem(data) {
  const resultatsCliques = document.querySelectorAll(".resultat");
  var commentaire = document.querySelector("#item_commentaire");
  var titre = document.querySelector("#item_titre");
  var artiste = document.querySelector("#item_artiste");
  var commentaire = document.querySelector("#item_commentaire");
  if (resultatsCliques !== null) {
    resultatsCliques.forEach((resultat) => {
      resultat.addEventListener("click", (event) => {
        console.log(data)
        const index = event.currentTarget.dataset.compteur;
        commentaire.value = data.items[index].volumeInfo.description
        titre.value = data.items[index].volumeInfo.title + " - " + data.items[index].volumeInfo.subtitle
        artiste.value = data.items[index].volumeInfo.authors[0]
      });
    });
  }
}

