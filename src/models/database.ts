import PeliculaInterface from "../interfaces/pelicula.interface"
import UsuarioInterface from "../interfaces/usuario.interface"

class Database{

    public usuarios: UsuarioInterface[];
    public peliculas: PeliculaInterface[];
    public peliculasEnReproduccion: PeliculaInterface[];

    constructor() {
        this.usuarios = [];
        this.peliculas = [];
        this.peliculasEnReproduccion = [];
    }

    
}

export const database = new Database();