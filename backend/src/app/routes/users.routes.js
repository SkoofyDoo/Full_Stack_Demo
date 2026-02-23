import {Router} from 'express'
import {validate} from '../middleware/validate.js'
import {createUserSchema, userIdParamsSchema} from '../schemas/users.schema.js'
import {usersController} from '../controllers/users.controllers.js'

export function usersRoutes(){
    const router = Router();

    router.post('/', validate({body: createUserSchema}), usersController.create);
    router.get('/:id', validate({params: userIdParamsSchema}), usersController.getById);
    router.get('/', usersController.list);

    return router;
}