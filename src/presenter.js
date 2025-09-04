function obtenerSaludo(nombre, genero, edad, idioma) {
  const fechaActual = new Date();
  const horaActual = fechaActual.getHours();

    const textos = {
    es: {
      morning: "Buenos días",
      afternoon: "Buenas tardes",
      evening: "Buenas noches",
      mr: "Sr.",
      mrs: "Sra."
    },
    en: {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
      mr: "Mr.",
      mrs: "Mrs."
    }
  };

    const lang = textos[idioma] || textos["es"];
  
  let saludo = "";
  if (horaActual >= 6 && horaActual < 12) {
    saludo = lang.morning;
  } else if (horaActual >= 12 && horaActual < 18) {
    saludo = lang.afternoon;
  } else {
    saludo = lang.evening;
  }
  
  if (nombre && nombre.trim() !== "") {
    if (edad && edad > 30) {
    if (genero === "M") {
      saludo += ", Sr. " + nombre.trim();
    } else if (genero === "F") {
      saludo += ", Sra. " + nombre.trim();
    } else {
      saludo += ", " + nombre.trim();
    }
  } else {
      saludo += ", " + nombre.trim();
  }
}
  
  return saludo;

}

document.addEventListener("DOMContentLoaded", () =>
  {
  const saludoSpan = document.getElementById('saludo-span');
  const inputNombre = document.getElementById('nombre');
  const selectGenero = document.getElementById("genero");
  const inputEdad = document.getElementById("edad");
  const selectIdioma = document.getElementById("idioma");

  function actualizarSaludo() {
    saludoSpan.textContent = obtenerSaludo(
      inputNombre.value,
      selectGenero.value,
      parseInt(inputEdad.value),
      selectIdioma.value
    );
  }

  saludoSpan.textContent = obtenerSaludo();
  inputNombre.addEventListener("input", actualizarSaludo);
  selectGenero.addEventListener("change", actualizarSaludo);
  inputEdad.addEventListener("input", actualizarSaludo);
  selectIdioma.addEventListener("change", actualizarSaludo);
});
  
export { obtenerSaludo };

  