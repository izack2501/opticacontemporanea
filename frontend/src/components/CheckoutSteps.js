import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Logueate</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Registrate</Nav.Link>)}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Compras</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Compras</Nav.Link>)}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Pago</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Pago</Nav.Link>)}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Ubicar Pedido</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Ubicar Pedido</Nav.Link>)}
            </Nav.Item>
            
        </Nav>
    )
}

export default CheckoutSteps