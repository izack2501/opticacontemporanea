import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
    const cart = useSelector (state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1> Mis Compras</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Dirección'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ciudad'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Código Postal</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Código postal'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>País</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='País'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continuar
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
