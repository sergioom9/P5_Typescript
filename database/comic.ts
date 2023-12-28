import mongoose from "mongoose";
import { Comic } from "../type.ts";
import { ColeccionModel } from "./coleccionComics.ts";

const Schema = mongoose.Schema; 

const ComicSchema = new Schema( 
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    formato: { type: String, required: true },
  },
  { timestamps: true }
);

export type ComicModelType = mongoose.Document & Omit<Comic,"id">; 

//funcion para actualizar datos despues de algun borrado
ComicSchema.post('findOneAndDelete', async function (doc: ComicModelType) {
  try {
    await ColeccionModel.updateMany( 
      { id_comics: doc._id },           
      { $pull: { id_comics: doc._id } } 
    );
  } catch (e) {
    console.log(e);
  }
});


export const ComicModel = mongoose.model<ComicModelType>( 
  "Comic", 
  ComicSchema 
);