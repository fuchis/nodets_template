import { Router } from 'express';
import { usuariosController } from '../controllers/usuarios.controller';

class UsuariosRoutes {

    private routerUsuarios: Router;

    constructor({usuariosController}) {
        this.routerUsuarios = Router();
        this.routerUsuarios.post('/usuario', usuariosController.crearUsuario);
        this.routerUsuarios.get('/usuarios/:id/peliculas', usuariosController.obtenerPeliculasVistasDelUsuario);
        this.routerUsuarios.get('/usuarios', usuariosController.obtenerUsuarios);
        
    }

    public getRouter = () => {
        return this.routerUsuarios;
    }
}

export const UsuariosRouter = new UsuariosRoutes({usuariosController})
