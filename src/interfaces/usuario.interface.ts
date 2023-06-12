import PeliculaInterface from "./pelicula.interface";

export default interface UsuarioInterface {
    id?: number;
    nombre: string;
    peliculas?: PeliculaInterface[]
    
}