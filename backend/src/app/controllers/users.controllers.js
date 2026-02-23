import {usersService} from '../services/users.service.js'


export const usersController = {
    create (req, res, next) {
        try {
            const user = usersService.create(req.body)
            return res.status(201).json(user)

        } catch (error) {
            return next(error)
        }
    },

    getById(req, res){
        const user = usersService.getById(req.params.id);
        if(!user) return res.status(404).json({message: 'User nicht gefunden'})
        return res.json(user)
    },

    list(req, res){
        return res.json(usersService.list())
    },
}