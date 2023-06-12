import { Request, Response } from "express";
import { usuariosService } from "../services/usuarios.service";

class UsuariosController {

    private usuariosService : any;

    constructor({usuariosService}) {
        this.usuariosService = usuariosService;
    }

    obtenerUsuarios = async(req: Request, res:Response) => {
        try {
            let result = await this.usuariosService.obtenerUsuarios();
            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.json(error.message);
        }
    }

    crearUsuario = async(req: Request, res:Response) => {
        try {
            let {nombre} = req.body;
            let result = await this.usuariosService.crearUsuario(nombre);
            return res.json(result);
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    obtenerPeliculasVistasDelUsuario = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            let result = await this.usuariosService.obtenerPeliculasVistasDelUsuario(id);
            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.json({msg: error.message});
        }
    }
    
}

export const usuariosController = new UsuariosController({usuariosService});