import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, CardColumns, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

export const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    //calcular precios
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.totalPrice = cart.itemsPrice

   /*  cart.shippingPrice = cart.itemsPrice * cart.item.qty */
    /* cart.taxPrice = addDecimals(Number((0.21 * cart.itemsPrice).toFixed(2)))

    const addDecimals = (num) => {
        return (Math.round(num*100) / 100).toFixed(2)
    } */

    const orderCreate = useSelector(state => state.orderCreate)
    const { orderItems, success, error } = orderCreate

    useEffect(() => {
        if(success) {
            console.log('success')
            /* history.push(`/order/${order._id}`) */
        }
        
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Envío
                            </h2>
                            <p>
                                <strong>Dirección: </strong>
                                <ul>
                                    <li>{cart.shippingAddress.address}</li>
                                    <li>{cart.shippingAddress.city}</li>
                                    <li>{cart.shippingAddress.postalCode}</li>
                                    <li>{cart.shippingAddress.country}</li>
                                </ul>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Método de pago</h2>
                            <strong>Método: </strong>
                            <ul>
                                <li>{cart.paymentMethod}</li>
                            </ul>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Items Seleccionados:</h2>
                            {cart.cartItems.length === 0 ? <Message>Tu carrito está vacío</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>            
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    Resumen del Pedido:
                                </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Artículos</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Compras</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Impuestos</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                type='button' 
                                className='btn-block' 
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}>
                                    Realizar el pedido
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                </Row>
        </>
    )
}

export default PlaceOrderScreen
