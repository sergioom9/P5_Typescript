import { UsuarioModelType } from "../database/usuario.ts";
import { ColeccionModel,ColeccionModelType } from "../database/coleccionComics.ts";
import { GraphQLError } from "graphql"; 
export const Usuario = {
    
coleccion: async (parent: UsuarioModelType):Promise<ColeccionModelType[]> => {
        const coleccion = await ColeccionModel.find({ _id:{$in: parent.coleccion }});
        if (!coleccion) {
            throw new GraphQLError("No user");
        }
        return coleccion;
    },
};
