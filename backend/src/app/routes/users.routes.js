import {Router} from 'express'
import {validate} from '../middleware/validate'
import {createUserSchema, userIdParamsSchema} from '../schemas/users.schema'
import {usersController} from '../controllers/users.controllers'

export function usersRoutes(){
    const router = Router();

    router.post('/', validate({body: createUserSchema}), usersController.create);
    router.get('/:id', validate({params: userIdParamsSchema}), usersController.getById);
    router.get('/', usersController.list);

    return router;
}