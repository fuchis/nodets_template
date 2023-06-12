import { usuariosRepository } from "../repositories/usuarios.repository";
import { peliculasRepository } from "../repositories/peliculas.repository";
import PeliculaInterface from "../interfaces/pelicula.interface";
import { Search } from "./binary-search.utils";
import UsuarioInterface from "../interfaces/usuario.interface";

const validarExistenciaUsuario = async(usuario: UsuarioInterface) => {
    try {
        const usuarios = await usuariosRepository.obtenerUsuarios();
        const indice = Search.BinarySearch(usuarios, usuario.id, "id");
        if(indice < 0) throw new Error("El Usuario No Existe");
        return;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

/**
 * Si la pelicula existe(devuelve un indice valido) en la lista de reproduccion, devolver un error
 * @param pelicula pelicula a buscar en lista de reproduccion
 */
const validarListaDeReproduccion = async(pelicula: PeliculaInterface) => {
    try {
        const peliculasEnReproduccion = await peliculasRepository.obtenerPeliculasEnReproduccion();
        const indice = Search.BinarySearch(peliculasEnReproduccion, pelicula.id, "id");
        if(indice >= 0) throw new Error("Pelicula en Reproduccion por otro usuario, no se puede ver");
        return;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const Validaciones = {
    ValidarExistenciaUsuario: validarExistenciaUsuario,
    ValidarListaDeReproduccion: validarListaDeReproduccion
}
