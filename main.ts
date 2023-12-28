import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs } from "./gql/type.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { Query } from "./resolvers/query.ts";
import { Usuario } from "./resolvers/usuario.ts";
import {Coleccion} from "./resolvers/Coleccion.ts"

try{  
  
   
  await mongoose.connect("mongodb+srv://sergioom9:nebrija22@cluster0.9dzkoo1.mongodb.net/?retryWrites=true&w=majority");
  
  const resolvers = { Mutation, Query};
  
  const server = new ApolloServer({
    typeDefs,
    resolvers:{
      Query,
      Mutation,
      Usuario,
      Coleccion,
    }

  });
  
  const svr= await startStandaloneServer(server, {listen: { port: 8080 }}); 
  
  console.log(`Server ready`);
}
catch(error){
  console.error(error);
}
