import {Router} from 'express'
import {validate} from '../middleware/validate.js'
import {createUserSchema, userIdParamsSchema, updateUserSchema} from '../schemas/users.schema.js'
import {usersController} from '../controllers/users.controllers.js'


export function usersRoutes(){
    const router = Router();

    router.post('/', validate({body: createUserSchema}), usersController.createUser);
    router.get('/:id', validate({params: userIdParamsSchema}), usersController.getUserById);
    router.put('/:id', validate ({params: userIdParamsSchema, body: updateUserSchema}),usersController.updateUser)
    router.delete('/:id', validate({params: userIdParamsSchema}), usersController.deleteUser)
    router.get('/', usersController.listUsers);

    return router;
}