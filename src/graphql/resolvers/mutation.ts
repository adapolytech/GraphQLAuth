import {Response} from "express"

const Resolvers = {
    Query: {
        getUser(_root: any, _: any, {dataSources}: any){
            return dataSources.users.getUsers()
        }
    },
    Mutation: {
        signIn: async (_root: any, {credentials}:{credentials:{email : string, password: string}}, {dataSources, res}: {dataSources: any, res: Response}, _: any )=>{
            const {email, password} = credentials
            const userCredentials = {email: email.toLowerCase(), password}
            console.log(userCredentials);
            if(dataSources.users.verifyEmail(email)!=-1){
                throw new Error("duplicated mail")
            }
            let token = dataSources.users.signUser({email, password});
            res.cookie('token', token)
            return {token}
        },
        signUp: async (_root: any, {credentials}: any, _context: any, _: any )=>{
        },
        logout: async (_root: any, _args :any, {dataSources, res}: {dataSources: any, res: Response}, _: any )=>{
            res.clearCookie('token');
            return {
                user: undefined
            }
        }

    }
}

export default Resolvers