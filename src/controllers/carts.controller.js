import {
    getCartsService,
    createCartsService,
    addProdCartsService,
    searchProdCartsService
} from '../services/carts.service.js'

import {
    getProdUidService
} from '../services/products.service.js'

const getCartsController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let cart = await getCartsService(cid);
        res.json({status: true, data: cart});
    } catch (error) {
        res.status(500).json({ "status": false, "message": `${error}`});
    }
}

const createCartsController = async (req, res) => {
    try {
        let cid = await createCartsService();
        res.json({status: true, data: cid});
    } catch (error) {
        res.status(500).json({ "status": false, "message": `${error}`});
    }
}

const addProdCartsController = async (req, res) => {
    try {
        let idCart = req.params.cid;
        let idProd = req.params.uid;
        let product = await getProdUidService(idProd);
        if(product) {
            if(product[0].stock > 0) {
                let prodCart = await searchProdCartsService(idCart, idProd);
                let quantity = 0;
                if(prodCart){
                    prodCart.products.forEach(element => {
                        if(element.product === idProd){
                            quantity = element.quantity;
                        }
                    });
                }
                quantity++;
                let result = await addProdCartsService(idCart, idProd, quantity);
                res.json({status: true, data: result});
            } else {
                res.status(400).json({ "status": false, "message": `product out of stock`});
            }
        } else {
            res.status(400).json({ "status": false, "message": `product does not exist`});
        } 
    } catch (error) {
        res.status(500).json({ "status": false, "message": `${error}`});
    }
}
 

export {getCartsController, createCartsController, addProdCartsController};