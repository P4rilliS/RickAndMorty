const btnCambioRegistro = document.getElementById('btnCambioRegistro')
const btnCambioSesion = document.getElementById('btnCambioSesion')
const formularioRegistroDeUsuario = document.getElementById("formularioRegistroDeUsuario")
const formularioInicioDeSesion = document.getElementById("formularioInicioDeSesion")
const iconoCheck = document.querySelectorAll(".check")
const registro = document.querySelector('.registro')
const inicio = document.querySelector('.inicio')
const btnCambio = document.querySelector('.btnCambio')
const registrarse = document.getElementById('registrarse')
const inputs = document.querySelectorAll('.input')
const USUARIOS = JSON.parse(localStorage.getItem('USUARIOS')) || []

const expresiones = {
  nombre: /^[a-z-A-ZÀ-ÿ\s]{3,40}$/,
  password: /^.{4,12}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}
const valido ={
  nombre: false,
  email: false,
  email2: false,
  clave: false,
  clave2: false,  
  clave3: false  
}



btnCambioRegistro.addEventListener('click', (e) => {
  e.preventDefault()
  inicio.classList.remove('mostrar')
  inicio.classList.add("oculto")
  registro.classList.remove("oculto")
  registro.classList.add("mostrar")
})
btnCambioSesion.addEventListener('click', (e) => {
  e.preventDefault()
  inicio.classList.remove('oculto')
  inicio.classList.add("mostrar")
  registro.classList.remove("mostrar")
  registro.classList.add("oculto")
})

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "email":
      validarCampo(expresiones.correo, e.target, "grupo1", "avisoEmailFormato")
      break
    case "clave":
      validarCampo(expresiones.password, e.target, "grupo2", "avisoClaveFormato")
      break
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "grupo3", "avisoNombreFormato")
      break
    case "email2":
      validarCampo(expresiones.correo, e.target, "grupo4", "avisoEmailFormato2")
      break
    case "clave2":
      validarClave3()
      validarCampo(expresiones.password, e.target, "grupo5", "avisoClaveFormato2")
      break
    case "clave3":
      validarClave3()
      break
      }
    }

const validarCampo = (expresion, input, grupo, aviso) => {
  if(expresion.test(input.value)){
    document.getElementById(grupo).classList.remove('datoIncorrecto')
    document.getElementById(grupo).classList.add('datoCorrecto')
    document.querySelector(`#${grupo} .check`).classList.add('visible')
    document.querySelector(`#${grupo} .nocheck`).classList.remove('visible')
    document.querySelector(`.${aviso}`).classList.remove('visible')
    document.querySelector(".avisoEmailNoRegistrado").classList.remove('visible')
    document.querySelector(".avisoClaveIncorrecta").classList.remove('visible')
    valido[input.name] = true
  }else{
    document.getElementById(grupo).classList.add('datoIncorrecto')
    document.getElementById(grupo).classList.remove('datoCorrecto')
    document.querySelector(`#${grupo} .nocheck`).classList.add('visible')
    document.querySelector(`#${grupo} .check`).classList.remove('visible')
    document.querySelector(`.${aviso}`).classList.add('visible')
    valido[input.name] = false
  }
}

const validarClave3 = () =>{
  let clave2 = document.getElementById('clave2').value
  let clave3 = document.getElementById('clave3').value
  if (clave2 !== clave3){
    document.getElementById('grupo6').classList.add('datoIncorrecto')
    document.getElementById('grupo6').classList.remove('datoCorrecto')
    document.querySelector("#grupo6 .nocheck").classList.add('visible')
    document.querySelector("#grupo6 .check").classList.remove('visible')
    document.querySelector(".avisoClaveFormato3").classList.add('visible')
    valido["clave3"] = false
  }else{
    document.getElementById("grupo6").classList.remove('datoIncorrecto')
    document.getElementById("grupo6").classList.add('datoCorrecto')
    document.querySelector("#grupo6 .check").classList.add('visible')
    document.querySelector("#grupo6 .nocheck").classList.remove('visible')
    document.querySelector(".avisoClaveFormato3").classList.remove('visible')
    valido["clave3"] = true
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario)
  input.addEventListener('blur', validarFormulario)
})


formularioRegistroDeUsuario.addEventListener('submit', (e) => {
  e.preventDefault()
  if(valido.nombre && valido.email2 && valido.clave2 && valido.clave3){
    const nombre = document.getElementById('nombre').value
    const email2 = document.getElementById('email2').value
    const clave3 = document.getElementById('clave3').value
    const usuariosGuardados = USUARIOS.find((usuario) => usuario.email2 === email2)
    if (usuariosGuardados) {
      alert(`El correo ${email2} ya ha sido registrado`)
      document.querySelector("#grupo4 .nocheck").classList.add('visible')
      document.querySelector("#grupo4 .check").classList.remove('visible')
      document.querySelector("#grupo4").classList.add('datoIncorrecto')
      document.querySelector("#grupo4").classList.remove('datoCorrecto')
      return
    }
    USUARIOS.push({nombre, email2, clave3})
    localStorage.setItem('USUARIOS', JSON.stringify(USUARIOS)) 
    alert("Usuario registrado exitosamente")   
    limpiarCampos()
    inicio.classList.remove('oculto')
    inicio.classList.add("mostrar")
    registro.classList.remove("mostrar")
    registro.classList.add("oculto")
    valido ={
      nombre: false,
      email: false,
      email2: false,
      clave: false,
      clave2: false,  
      clave3: false  
      }
  } else {
    console.log("algun dato esta mal")
  }
  
})
const limpiarCampos = () =>{
  inputs.forEach((input) => {
    input.value = ''
  })
  iconoCheck.forEach(check => {
    check.classList.remove('visible')
  })
}

formularioInicioDeSesion.addEventListener('submit',(e) => {
  e.preventDefault()
  const email = document.getElementById('email').value
  const clave = document.getElementById('clave').value
  if(valido.email && valido.clave){
    const usuarioIngresado = USUARIOS.find((usuario) => usuario.email2 === email)
    if (usuarioIngresado) {
      if(usuarioIngresado.clave3 !== clave){
        alert(`La contraseña es incorrecta`)
        document.querySelector("#grupo2 .nocheck").classList.add('visible')
        document.querySelector("#grupo2 .check").classList.remove('visible')
        document.querySelector("#grupo2").classList.add('datoIncorrecto')
        document.querySelector("#grupo2").classList.remove('datoCorrecto')
        document.querySelector(".avisoClaveIncorrecta").classList.add('visible')
        console.log("la contraseña es incorrecta")
        return
      } else {
        window.location.href = "./HTML/characters.html"
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioIngresado))
        localStorage.setItem("autenticado", "true")
        console.log(usuarioIngresado)

      }
    } else {
      alert(`El correo ${email} no ha sido registrado`)
      document.querySelector("#grupo1 .nocheck").classList.add('visible')
      document.querySelector("#grupo1 .check").classList.remove('visible')
      document.querySelector("#grupo1").classList.add('datoIncorrecto')
      document.querySelector("#grupo1").classList.remove('datoCorrecto')
      document.querySelector(".avisoEmailNoRegistrado").classList.add('visible')
      console.log("El email no esta registrado")
    }
  }else {
    console.log("no puedes iniciar sesion")
  } 
})