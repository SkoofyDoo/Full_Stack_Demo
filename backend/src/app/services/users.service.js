import crypto from 'crypto'

const users = new Map();

export const usersService = {
    create({name, email}){
        const id = crypto.randomUUID();
        const user = {id, name, email, createdAt: new Date().toDateString()}
        users.set(id, user)
        return user;
    },

    getById(id){
        return users.get(id) || 'Kein User unter dieser ID gefunden'
    },
    
    list(){
        return Array.from(users.values())
    },

    reset() {
        users.clear()
    }


}



