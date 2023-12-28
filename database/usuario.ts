import mongoose from "mongoose";
import { Usuario,Coleccion } from "../type.ts";
import { ColeccionModel } from "./coleccionComics.ts";

const Schema = mongoose.Schema; 

const UsuarioSchema = new Schema( 
  {
    nombre: { type: String, required: true },
    correo_electronico: { type: String, required: true },
    id_coleccion: [{ type: Schema.Types.ObjectId, required: true, ref: "Coleccion" }]
  },
  { timestamps: true }
);

export type UsuarioModelType = mongoose.Document & Omit<Usuario,"id">; 


export const UsuarioModel = mongoose.model<UsuarioModelType>( 
  "Usuario", 
  UsuarioSchema 
);