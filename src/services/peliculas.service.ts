import PeliculaDTO from "../dtos/pelicula.dto";
import PeliculaInterface from "../interfaces/pelicula.interface";
import UsuarioInterface from "../interfaces/usuario.interface";
import { peliculasRepository } from "../repositories/peliculas.repository";
import { usuariosRepository } from "../repositories/usuarios.repository";
import { Search } from "../utils/binary-search.utils";
import { Validaciones } from "../utils/validaciones.utils";

class PeliculasService {
    
    private peliculasRepository: any;
    private usuariosRepository: any;

    constructor({peliculasRepository, usuariosRepository}) {
        this.peliculasRepository = peliculasRepository;
        this.usuariosRepository = usuariosRepository;
    }

    crearPelicula = async(pelicula: PeliculaInterface) => {
        try {
            let result = await this.peliculasRepository.crearPelicula(pelicula);
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    obtenerPeliculas = async() => {
        try {
            return await this.peliculasRepository.obtenerPeliculas();
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    eliminarPelicula = async(id:number) => {
        try {
            console.log("ID", id);
            let input = await this.peliculasRepository.obtenerPeliculas();
            let index = Search.BinarySearch(input , id, "id");
            if(index < 0) throw new Error("El elemento no se encuentra en la bd");
            return await this.peliculasRepository.eliminarPelicula(index);
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
        
    }

    buscarPeliculaPorDirectorOTitulo = async(campo:string, filtro:string) => {
        try {
            let input = await this.peliculasRepository.obtenerPeliculas();
            let sortedInput = Search.SortByKey(input, filtro);
            let index = Search.BinarySearch(sortedInput, campo, filtro);
            if(index < 0) throw new Error("El elemento no se encuentra en la bd");
            return await this.peliculasRepository.buscarPorId(index);
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    verPelicula = async(usuario:UsuarioInterface, pelicula: PeliculaInterface) => {
        try {
            await Validaciones.ValidarListaDeReproduccion(pelicula);
            await Validaciones.ValidarExistenciaUsuario(usuario);
            let usuarios = await this.usuariosRepository.obtenerUsuarios();
            let indiceUsuario = Search.BinarySearch(usuarios, usuario.id, "id");
            const id:any = pelicula.id;
            let nuevaPeliculaEnReproduccion = new PeliculaDTO(id, pelicula.titulo, pelicula.director);
            nuevaPeliculaEnReproduccion.setVistoPor(usuario);
            let result = await this.peliculasRepository.crearPeliculaEnReproduccion(indiceUsuario, nuevaPeliculaEnReproduccion);
            return result;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    removerPeliculaDeListaDeReproduccion = async(id:number) => {
        try {
            let peliculasEnReproduccion = this.peliculasRepository.obtenerPeliculasEnReproduccion();
            let indice = Search.BinarySearch(peliculasEnReproduccion, id, "id");
            if(indice < 0) throw new Error("La pelicula no existe en las peliculas en reproduccion");
            let result = await this.peliculasRepository.removerPeliculaEnReproduccion(indice);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

}

export const peliculasService = new PeliculasService({peliculasRepository, usuariosRepository});

