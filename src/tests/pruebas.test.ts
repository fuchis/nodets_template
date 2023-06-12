import {describe, expect, test, it} from '@jest/globals';
import request from "supertest";
import  Server  from '../models/server';

const server = new Server();
const app = server.app;

describe('Crear un Usuario', () => {
    it('Deberia crear un nuevo usuario', async() => {
        const res = await request(app)
        .post('/usuario')
        .send({
            nombre: "Ivan Lopez"
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toEqual("Usuario creado con exito");
    })
});

describe('Crear una Pelicula', () => {
    it('Deberia crear un nueva Pelicula', async() => {
        const res = await request(app)
        .post('/peliculas')
        .send({
            titulo: "spiderman",
            director: "Sam raimi"
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toEqual("Pelicula creada con exito");
    })
});

