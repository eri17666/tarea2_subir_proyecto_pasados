export function obtenerSaludo(nombre = "", genero = "", edad = null, idioma = "es") {
const fechaActual = new Date()
const hora = fechaActual.getHours()

let saludo = ""

if (hora >= 6 && hora < 12) {
    if (idioma === "en") {
    saludo = "good morning"
    } else {
    saludo = "buenos dias"
    }
} else if (hora >= 12 && hora < 18) {
    if (idioma === "en") {
    saludo = "good afternoon"
    } else {
    saludo = "buenas tardes"
    }
} else {
    if (idioma === "en") {
    saludo = "good evening"
    } else {
    saludo = "buenas noches"
    }
}

if (edad && edad > 30) {
    if (genero === "masculino") {
    if (idioma === "en") {
        saludo += ", mr."
    } else {
        saludo += ", sr."
    }
    } else if (genero === "femenino") {
    if (idioma === "en") {
        saludo += ", mrs."
    } else {
        saludo += ", sra."
    }
    }
}

if (nombre && nombre.trim() !== "") {
    saludo += " " + nombre.trim()
}

return saludo
}
