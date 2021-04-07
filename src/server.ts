import dotenv from "dotenv";
import express, { Application } from "express"
import cookies from "cookie-parser"
import {ApolloServer} from "apollo-server-express"
import {typedefs, typesString} from "../src/graphql/typedefs/index"
import Resolvers from "../src/graphql/resolvers/mutation"
import UserController from "../src/graphql/datasources/users"

dotenv.config();
console.log(process.env.SECRET);

(async function start(){
    const app: Application = express();
    app.use(cookies());

    const apolloserver = new ApolloServer({
        typeDefs:  typedefs,
        resolvers: Resolvers,
        introspection: false ,
        dataSources: ()=>{
            return {
                users: new UserController()
            }
        },
        context: ({req, res})=>{
            const user = null;
            if(req.cookies.token){
                // user = auth.decode(req.cookies.token)
            }
            return {user, res};
        }
    });

    apolloserver.applyMiddleware({app: app, path: '/api/user'});
    try {
        app.listen(4000, ()=>{
            console.log("app listen at http:localhot:4000")
        })    
    } catch (error) {
     console.log(error)   
    }
    
})()