import { mongoose } from "mongoose";
import { GraphQLError } from "graphql"; 
import { UsuarioModel,UsuarioModelType } from "../database/usuario.ts";
import { ComicModel, ComicModelType } from "../database/comic.ts";
import { ColeccionModel, ColeccionModelType } from "../database/coleccionComics.ts";

export const Mutation = {
    
    addUsuario: async (_:unknown, args: {nombre: string, correo_electronico:string, coleccion:String[]}): Promise<UsuarioModelType>  => {
        const { nombre, correo_electronico, coleccion } = args;
        try{
            const id_coleccion = coleccion.map(coleccionID => new mongoose.Types.ObjectId(coleccionID)); 
            const usuario_find = new UsuarioModel({
                nombre,
                correo_electronico,
                id_coleccion,
            });
            await usuario_find.save();
            return usuario_find;
        }catch(e){
            throw new GraphQLError(e);
        }
        
    },
    
    updateUsuario: async (_:unknown, args: {id:string, nombre: string, correo_electronico:string, coleccion:String[]}): Promise<UsuarioModelType>  => {
        const { id, nombre, correo_electronico, coleccion } = args;
        const id_coleccion = coleccion.map(coleccionID => new mongoose.Types.ObjectId(coleccionID));
        const usuario_find = await UsuarioModel.findByIdAndUpdate(
        id,
        { nombre, correo_electronico, id_coleccion },
        { new: true, runValidators: true } 
        );
        if (!usuario_find) {
            throw new GraphQLError("No user");
        }
        return usuario_find;
    },

    deleteUsuario: async (_:unknown, args: {id:string}): Promise<UsuarioModelType>  => {
        const { id } = args;
        const usuario_find = await UsuarioModel.findByIdAndDelete(id); 
        if (!usuario_find) {
            throw new GraphQLError("No user");
        }
        return usuario_find;
    },
    

    addColeccion: async (_:unknown, args: {nombre: string, comics:String[]}): Promise<ColeccionModelType>  => {
        const { nombre, comics } = args;
        try{
            const id_comics = comics.map(comicId => new mongoose.Types.ObjectId(comicId)); 
            const coleccion = new ColeccionModel({
                nombre,
                id_comics,
            });
        await coleccion.save();
        return coleccion;
        }catch(e){
            throw new GraphQLError(e);
        }
    },

    updateColeccion: async (_:unknown, args: {id:string, nombre: string, comics:String[] }): Promise<ColeccionModelType>  => {
        const { id, nombre, comics } = args;
        const id_comics = comics.map(comicId => new mongoose.Types.ObjectId(comicId)); 
        const coleccion_find = await ColeccionModel.findByIdAndUpdate(
        id,
        { nombre, id_comics },
        { new: true, runValidators: true } //actualizacion
        );
    
        if (!coleccion_find) {
            throw new GraphQLError("No coleccion");
        }
        return coleccion_find;
    },

    deleteColeccion: async (_:unknown, args: {id:string}): Promise<ColeccionModelType>  => {
        const { id } = args;
        const coleccion_find = await ColeccionModel.findOneAndDelete({ _id: id });
        if (!coleccion_find) {
            throw new GraphQLError("No coleccion");
        }
        return coleccion_find;
    },

    
    addComic: async (_:unknown, args: {titulo: string, descripcion:string, formato:string}): Promise<ComicModelType>  => {
        const { titulo, descripcion, formato } = args;
        const comic = new ComicModel({
        titulo,
        descripcion,
        formato,
        });
        await comic.save();
        return comic;
    },

    updateComic: async (_:unknown, args: {id:string, titulo: string, descripcion:string, formato:string}): Promise<ComicModelType>  => {
        const { id, titulo, descripcion, formato } = args;
        const comic_find = await ComicModel.findByIdAndUpdate(
        id,
        { titulo, descripcion, formato },
        { new: true }
        );
        if (!comic_find) {
            throw new GraphQLError("No comic");
        }
        return comic_find;
    },

    deleteComic: async (_:unknown, args: {id:string}): Promise<ComicModelType>  => {
        const { id } = args;
        const comic_find = await ComicModel.findOneAndDelete({ _id: id }); 
        if (!comic_find) {
            throw new GraphQLError("No comic");
        }
        return comic_find;
    }

};