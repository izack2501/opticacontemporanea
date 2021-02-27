import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@description esto va a fetchear todos los productos
//@route       GET /api/products
//@access      Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})


//@descripcion  Fetch a single product
//@ruta  GET /api/products/:id
//@acceso  public
const getProductById= asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

        if(product) {
            res.json(product)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
})

export {
    getProductById, getProducts
}