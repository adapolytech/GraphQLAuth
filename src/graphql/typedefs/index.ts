import {readFileSync} from "fs"
import {join} from "path"
import {gql} from "apollo-server-express"


const filepath = join(__dirname,'types.graphql');
const typesString: string = readFileSync(filepath, {
    encoding:'utf-8'
})
// console.log(file)
const typedefs = gql`
enum Role {
    ADMIN
    USER
}
type User{
    id: ID!
    password: String!
    email: String!
    role: Role!
    job: String!
}

input Credentials{
    email: String!
    password: String!
}

type AuthPayload{
    token: String
    user: User
}

type Query{
    getUser: [User]
}

type Mutation{
    signIn(credentials: Credentials!): AuthPayload
    signUp(credentials: Credentials!): AuthPayload
}
`

export{typedefs, typesString}