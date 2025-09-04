import { obtenerSaludo } from "./saludador.js"

describe("saludador", () => {
it("deberia saludar con el nombre", () => {
    expect(obtenerSaludo("juan")).toMatch(/juan/)
})

it("deberia saludar en ingles", () => {
    expect(obtenerSaludo("mary", "femenino", 25, "en")).toMatch(/mary/)
})

it("deberia agregar sr para mayores de 30", () => {
    expect(obtenerSaludo("carlos", "masculino", 40)).toMatch(/sr/)
})

it("deberia agregar sra para mayores de 30", () => {
    expect(obtenerSaludo("ana", "femenino", 32)).toMatch(/sra/)
})

it("deberia usar buenos dias en la manana", () => {
    const morning = new Date(2025, 0, 1, 8) // 8 am
    jest.spyOn(global, "Date").mockImplementation(() => morning)
    expect(obtenerSaludo("juan")).toMatch(/buenos dias/)
    jest.restoreAllMocks()
})

it("deberia usar buenas noches en la noche", () => {
    const night = new Date(2025, 0, 1, 22) // 10 pm
    jest.spyOn(global, "Date").mockImplementation(() => night)
    expect(obtenerSaludo("lucia")).toMatch(/buenas noches/)
    jest.restoreAllMocks()
})
})
