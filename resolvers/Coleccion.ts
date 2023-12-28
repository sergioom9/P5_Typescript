import { ColeccionModelType } from "../database/coleccionComics.ts";
import { ComicModel, ComicModelType } from "../database/comic.ts";
import { GraphQLError } from "graphql"; 


export const Coleccion = {
    comics: async (parent: ColeccionModelType):Promise<ComicModelType[]> => {
        const comics = await ComicModel.find({ _id:{$in: parent.id_comics }});
        if (!comics) {
            throw new GraphQLError("No comic");
        }
        return comics;
    },
};