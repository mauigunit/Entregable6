import { Router } from 'express';
import {
    getCartsController,
    createCartsController,
    addProdCartsController
} from '../controllers/carts.controller.js';

const cartsRouter = Router();

cartsRouter.get('/:cid', getCartsController);
cartsRouter.post('/', createCartsController);
cartsRouter.post('/:cid/product/:uid', addProdCartsController);

export default cartsRouter;