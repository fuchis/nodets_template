import PeliculaInterface from "../interfaces/pelicula.interface";

export default class UsuarioDTO {
    private id: number;
    private nombre: string;
    private peliculas: PeliculaInterface[]

    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
        this.peliculas = [];
    }
}