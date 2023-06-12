import { database } from "../models/database";
import UsuarioInterface from "../interfaces/usuario.interface";
import UsuarioDTO from "../dtos/usuario.dto";

class UsuariosRepository {
    private db: any;
    private idCounter:number = 1;

    constructor({database}) {
        this.db = database;
    }

    crearUsuario(usuario:string) {
        try {
            const idUser = this.idCounter;
            const nuevoUsuario: UsuarioDTO = new UsuarioDTO(idUser, usuario);
            this.db.usuarios.push(nuevoUsuario);
            this.idCounter++;
            return {msg: "Usuario creado con exito"}
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    obtenerUsuarios = async() => {
        try {
            return await this.db.usuarios;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    buscarPorId = async(id:number) => {
        try {
            return this.db.usuarios[id];
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
        
    }


}

export const usuariosRepository = new UsuariosRepository({database});