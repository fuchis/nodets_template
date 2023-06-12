import PeliculaDTO from "../dtos/pelicula.dto";
import PeliculaInterface from "../interfaces/pelicula.interface";
import UsuarioInterface from "../interfaces/usuario.interface";
import { Search } from "../utils/binary-search.utils";
import { Validaciones } from "../utils/validaciones.utils";
import { usuariosRepository } from "../repositories/usuarios.repository";
import UsuarioDTO from "../dtos/usuario.dto";

class UsuariosService {
    
    private usuariosRepository: any;

    constructor({usuariosRepository}) {
        this.usuariosRepository = usuariosRepository;
    }

    crearUsuario = async(usuario: string) => {
        try {
            return await this.usuariosRepository.crearUsuario(usuario);
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    obtenerUsuarios = async() => {
        try {
            return await this.usuariosRepository.obtenerUsuarios();
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    obtenerPeliculasVistasDelUsuario = async(id:number) => {
        try {
            let usuarios = await this.usuariosRepository.obtenerUsuarios();
            let indice = Search.BinarySearch(usuarios, id, "id");
            if(indice < 0) throw new Error("No existe el usuario");
            if(usuarios[indice].peliculas.length == 0) throw new Error("Este usuario no tiene peliculas vistas");
            const result = await this.usuariosRepository.buscarPorId(indice);
            const peliculas: PeliculaInterface = result.peliculas;
            return peliculas;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

}

export const usuariosService = new UsuariosService({usuariosRepository});

