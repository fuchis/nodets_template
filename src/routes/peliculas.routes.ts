import { Router } from 'express';
import { peliculasController } from '../controllers/peliculas.controller';

class PeliculasRoutes {

    private routerPeliculas: Router;

    constructor({peliculasController}) {
        this.routerPeliculas = Router();
        this.routerPeliculas.get('/peliculas', peliculasController.obtenerPeliculas);
        this.routerPeliculas.post('/peliculas', peliculasController.crearPelicula);
        this.routerPeliculas.delete('/peliculas/:id', peliculasController.eliminarPelicula);
        this.routerPeliculas.post('/verPelicula', peliculasController.verPelicula);
        this.routerPeliculas.delete('/verPelicula/:id', peliculasController.removerPeliculaDeListaDeReproduccion);
        this.routerPeliculas.post('/busqueda/peliculas', peliculasController.buscarPeliculaPorDirectorOTitulo);
    }

    public getRouter = () => {
        return this.routerPeliculas;
    }
}

export const PeliculasRouter =  new PeliculasRoutes({peliculasController})
