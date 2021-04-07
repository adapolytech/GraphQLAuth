import {DataSource} from "apollo-datasource"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

console.log(process.env.SECRET)
type User = {
    email:string,
    password: string
}
const usersdata = [
    {
        id:1,
        email: 'paadama17@gmail.com',
        job: 'fullstack developer',
        password:'secret'
    },
    {
        id:2,
        email: 'paadama49@hotmail.com',
        job: 'Cloud Architect',
        password:'passer'
    }
]

export default class UserController extends DataSource{
    verifyEmail(email: string) {
        return usersdata.findIndex((value)=>{
            value.email == email
        })
    }
    getUsers(){
        return usersdata
    }
    async signUser({email, password}: User){
        const hashed = await this.hashPassword(password);
        const role = email.endsWith("@devkmt.com") ? "ADMIN" : "USER"
        const userInfo = {id: usersdata.length+1, job: 'Software Engineer' , email, password: hashed, role}
        usersdata.push(userInfo);
        return this.createToken(userInfo);
    }

    createToken({id, email}:{id: number, email: string}){
        return JWT.sign({userId:id, email: email}, '@devkmt')
    }

    hashPassword(plainText: string){
        return bcrypt.hash(plainText, 10);
    }
    compare(plainText: string, hash: string){
        return bcrypt.compare(plainText, hash);
    }
}