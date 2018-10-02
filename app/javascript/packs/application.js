import "bootstrap";

// Catégorie sélectionnée
const categorie = document.querySelector("#item_categorie");
categorie.addEventListener('blur', (evt) => {
  evt.preventDefault();
  console.log(categorie.value);
  if (categorie.value === "Musique") {
    console.log("c'est de la musique")
  }
  else if (categorie.value === "Films") {
    CallTmdb();
  }
  else {
    console.log("c'est autre chose")
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

  // Fetch le nom d'un film
function CallTmdb() {
  const artiste = document.querySelector("#item_artiste");
  artiste.addEventListener('blur', (evt) => {
    evt.preventDefault();
    const movieKey = document.querySelector('.tmdb_key').dataset.tmdb;
    const commentaire = document.querySelector("#item_commentaire");
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=en-US&query=${artiste.value}&page=1&include_adult=false`, {
       method: "GET",
       })
       .then(response => response.json())
       .then((data) => {
         console.log(data.results[0].overview);
         commentaire.value = data.results[0].overview
       });
  });
}


