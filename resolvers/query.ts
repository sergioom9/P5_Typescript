import { GraphQLError } from "graphql"; 
import { UsuarioModel, UsuarioModelType } from "../database/usuario.ts";
import { ComicModel, ComicModelType } from "../database/comic.ts";

export const Query = {

    
    usuario: async (_:unknown, args: {id:string}): Promise<UsuarioModelType>  => {
        const { id } = args;
        try{
            const usuario_find = await UsuarioModel.findById(id);

            if (!usuario_find) {
                throw new GraphQLError("No user");
            }
            const Usuario = {
                id: usuario_find._id,
                nombre: usuario_find.nombre,
                correo_electronico: usuario_find.correo_electronico,
                coleccion: usuario_find.id_coleccion,
            }
        return Usuario;
        }catch(e){
            throw new GraphQLError(e);
        }
    },
    
    usuarios: async (): Promise<UsuarioModelType[]>  => {
        try{
            const usuarios_find = await UsuarioModel.find();
            const usuarios = usuarios_find.map((usuarios_find:UsuarioModelType) => {
                const Usuario = {
                    id: usuarios_find._id,
                    nombre: usuarios_find.nombre,
                    correo_electronico: usuarios_find.correo_electronico,
                    coleccion: usuarios_find.id_coleccion,
                }
                return Usuario;
            });
            return usuarios;
        }
        catch(e){
            throw new GraphQLError(e);
        }
    },
     
    comic: async (_:unknown, args: {id:string}): Promise<ComicModelType>  => {
        const { id } = args;
        const comic = await ComicModel.findById(id);
        if (!comic) {
            throw new GraphQLError("No comic");
        }
        return comic;
    },
    
    comics: async (): Promise<ComicModelType[]>  => {
        const comics = await ComicModel.find();
        return comics;
    },

}