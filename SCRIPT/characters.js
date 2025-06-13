document.addEventListener("DOMContentLoaded", () => {
  const usuarioAutenticado = localStorage.getItem("autenticado")
  if (usuarioAutenticado !== "true") {
    window.location.href = "../index.html"}
});

salir = document.getElementById("salir")


salir.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem("usaurioActual")
  localStorage.removeItem("autenticado")
  window.location.href = "../index.html"
  console.log(localStorage.getItem("usuarioActual"), localStorage.getItem("autenticado"))

})

