// document.addEventListener("DOMContentLoaded", () => {
//   const usuarioAutenticado = localStorage.getItem("autenticado")
//   if (usuarioAutenticado !== "true") {
//     window.location.href = "../index.html"}
// });

// salir = document.getElementById("salir")


// salir.addEventListener('click', (e) => {
//   e.preventDefault()
//   localStorage.removeItem("usaurioActual")
//   localStorage.removeItem("autenticado")
//   window.location.href = "../index.html"
//   console.log(localStorage.getItem("usuarioActual"), localStorage.getItem("autenticado"))

// })

personajes = document.getElementById("characters-grid")

const API = "https://rickandmortyapi.com/api/character";
const obtenerDatos = async () => {
    const apiRecibida = await fetch(API);
    const objetoApiRecibida = await apiRecibida.json();
    const objeto = objetoApiRecibida.results
    objeto.forEach((personaje) => {
    console.log(personaje)

    personajes.innerHTML += `
    <div class="carta" id="carta">
    <img src="${personaje.image}" alt="${personaje.name}">
    <h2>${personaje.name}</h2>
    <p>${personaje.status}</p>
    <p>${personaje.species}</p>
    <p>${personaje.gender}</p>
    </div>
    `
    });
}


<div class="carta" id="carta">
        <div><img src='https://cdn.pixabay.com/photo/2018/05/07/10/48/husky-3380548_960_720.jpg' alt="qqq">
          <div class="descripcion">            
            <h3 id="id">1</h3>
            <h4 id="name">Rycky Belmarejo</h4>
            <p>Humano</p>
            <p>Alive</p>
          </div>
        </div>
      </div>
obtenerDatos()