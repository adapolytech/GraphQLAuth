const object = {
    query: `
     query getUsers{
         getUsers{
             id
             username
             email
         }
     }
    `,
    variables: {}
}

const mutations = {
    query: `
    mutation addUser($credentials: User!){
        addUser(user: $credentials){
            id
            token
        }
    }
    `,
    variables: {
        credentials: {
            email: "paadama17@gmail.com",
            password: "secret"
        }
    }
}
let body = JSON.stringify(mutations);
