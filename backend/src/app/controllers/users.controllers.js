import {usersService} from '../services/users.service.js'


export const usersController = {
    async createUser (req, res, next) {
        try {
            const user = await usersService.createUser(req.body)
            
            return res.status(201).json(user)

        } catch (e) {
            return next(e)
        }
    },

    async getUserById(req, res, next) {
        try { 
            const user = await usersService.getUserById(req.params.id);
            if(!user) 
                return res.status(404).json({message: 'Benutzer nicht gefunden'})
        
            return res.json(user)

        } catch (e) {
            return next(e)
        }
       
    },

    async updateUser(req, res, next) {
        try {
            const user = await usersService.updateUser(req.params.id, req.body)        
            if(!user) 
                return res.status(404).json({message: 'Benutzerdaten können nicht aktualisisert werden. Benutzer existiert nicht'})         
            
            return res.status(200).json(user)

        } catch (e) {
           return next(e)
        } 
    },

    async deleteUser(req, res, next) {
        try {
            const user = await usersService.deleteUser(req.params.id)
            if(!user) 
                return res.status(404).json({message: 'Benutzer kann nicht gelöscht werden. Benutzer unter dieser ID existiert nicht'})            
            
            return res.status(204).send()

        } catch (e) {
            return next(e)
        }
    },

    async listUsers(req, res, next){
        try {
            const users = await usersService.listUsers()
            return res.json(users)
        } catch(e) {
            return next(e)
        } 
    },
}