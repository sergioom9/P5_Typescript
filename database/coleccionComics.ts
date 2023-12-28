import mongoose from "mongoose";
import { Coleccion } from "../type.ts";
import { ComicModel } from "./comic.ts";
import { UsuarioModel } from "./usuario.ts";

const Schema = mongoose.Schema; 

const ColeccionSchema = new Schema(
  {
    //creamos los tipos de datos del schema de la base de datos en mongo menos el id que no se pone
    nombre: { type: String, required: true },
    id_comics: [{ type: Schema.Types.ObjectId, required: true, ref: "Comic" }]
  },
  { timestamps: true }
);


export type ColeccionModelType = mongoose.Document & Omit<Coleccion,"id">; 


//funcion para eliminar actualizar lista usuarios cuando se borre comic
ColeccionSchema.post('findOneAndDelete', async function (doc: ColeccionModelType) {
  try {
    await UsuarioModel.updateMany( 
      { id_coleccion: doc._id },           
      { $pull: { id_coleccion: doc._id } } 
    );
  } catch (e) {
    console.log(e);
  }
});

export const ColeccionModel = mongoose.model<ColeccionModelType>( 
  "Coleccion", 
  ColeccionSchema 
);

