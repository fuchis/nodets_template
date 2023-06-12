import { database } from "../models/database";
import PeliculaDTO from "../dtos/pelicula.dto";
import PeliculaInterface from "../interfaces/pelicula.interface";
import UsuarioInterface from "../interfaces/usuario.interface";

class PeliculasRepository {
    private db: any;
    private idCounter:number = 1;

    constructor({database}) {
        this.db = database;
    }

    crearPelicula = async(pelicula:PeliculaInterface) => {
        try {
            const { titulo, director } = pelicula;
            const newPelicula = new PeliculaDTO(this.idCounter, titulo, director);
            this.db.peliculas.push(newPelicula)
            this.idCounter++;
            return {msg: "Pelicula creada con exito"}
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    obtenerPeliculas = async() => {
        return await this.db.peliculas;
    }

    obtenerPeliculasEnReproduccion = async() => {
        return await this.db.peliculasEnReproduccion;
    }

    eliminarPelicula = async(id:number) => {
        try {
            const msg = `Pelicula: ${this.db.peliculas[id]}, eliminado`;
            await this.db.peliculas.splice(id, 1);
            return { msg: msg }
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    buscarPorId = async(id: number) => {
        try {
            console.log(id);
            console.log(typeof id)
            return this.db.peliculas[id];
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    crearPeliculaEnReproduccion = async(indiceUsuario:number, pelicula:PeliculaDTO ) => {
        try {
            this.db.peliculasEnReproduccion.push(pelicula);
            this.db.usuarios[indiceUsuario].peliculas.push(pelicula);
            return {msg: "agregado a lista de reproduccion"};
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    removerPeliculaEnReproduccion = async(indice:number) => {
        try {
            await this.db.peliculasEnReproduccion.splice(indice, 1);
            return {msg: 'pelicula eliminada de reproduccion'};
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

}

export const peliculasRepository = new PeliculasRepository({database});
