import mongoose from 'mongoose';
const productsCollection = 'products';
const cartsCollection = 'carts';

const productsSchema = mongoose.Schema({
    /*id: {type: String, required: false},*/
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    status: {type: Boolean, required: false, default: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: []
})

const productsCartsSchema = mongoose.Schema({
    product: {type: String, required: false},
    quantity: {type: Number, default: 1}
})

const cartsSchema = mongoose.Schema({
    products: {type: [productsCartsSchema], default: []}
})

export {productsCollection, cartsCollection, productsSchema, cartsSchema};