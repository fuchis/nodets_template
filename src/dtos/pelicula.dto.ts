export default class PeliculaDTO {
    private id: number;
    private titulo: string;
    private director: string;
    private vistoPor: any;

    constructor(id: number, titulo: string, director: string) {
        this.id = id;
        this.titulo = titulo;
        this.director = director;
        this.vistoPor = null;
    }

    setVistoPor(usuario:any) {
        this.vistoPor = usuario;
    }
}