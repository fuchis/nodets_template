import { Request, Response } from "express";
import { peliculasService } from "../services/peliculas.service";
import PeliculaInterface from "../interfaces/pelicula.interface";

class PeliculasController {
    
    private peliculasService: any;

    constructor({peliculasService}) {
        this.peliculasService = peliculasService;
    }
    
    obtenerPeliculas = async(req: Request, res:Response) => {
        try {
            let result = await this.peliculasService.obtenerPeliculas();
            res.json(result);
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    crearPelicula = async(req: Request, res:Response) => {
        try {
            const pelicula: PeliculaInterface = req.body;
            const result = await this.peliculasService.crearPelicula(pelicula);
            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.json({msg: error.message});
        }
    }

    obtenerPeliculasVistas = async(req:Request, res:Response) => {
        try {
            let result = await this.peliculasService.obtenerPeliculas();
            res.json(result);
        } catch (error) {
            console.log(error);
            return res.json({msg:error.message})
        }
    }

    eliminarPelicula = async(req:Request, res:Response) => {
        try {
            const { id } = req.params;
            const result = await this.peliculasService.eliminarPelicula(id);
            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.json({msg: error.message});
        }
    }

    buscarPeliculaPorDirectorOTitulo = async(req:Request, res:Response) => {
        try {
            const { campo, filtro } = req.body;
            const result = await this.peliculasService.buscarPeliculaPorDirectorOTitulo(campo, filtro);
            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.json({msg: error.message});
        }
    }

    verPelicula = async(req:Request, res:Response) => {
        try {
            const { usuario, pelicula } = req.body;
            const result = await this.peliculasService.verPelicula(usuario, pelicula); 
            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.json({msg: error.message});
        }

    }

    removerPeliculaDeListaDeReproduccion = async(req:Request, res:Response) => {
        try {
            const {id} = req.params;
            console.log("ID", id);
            let result = await this.peliculasService.removerPeliculaDeListaDeReproduccion(id);
            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.json({msg: error.message});
        }
    }
}

export const peliculasController = new PeliculasController({peliculasService});