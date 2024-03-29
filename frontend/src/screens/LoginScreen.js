import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault(
            dispatch(login(email, password))
        )
    }

    return (
        <FormContainer>
            <h1>Loguearse</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Ingresá tu correo electrónico'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Ingresá tu contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>

                        <Button type='submit' variant='primary'>
                            Loguearse
                        </Button>
                </Form.Group>
            </Form>

            <Row className='py-3'>
                <Col>
                    ¿Sos nuev@? <Link to={redirect ? `/register?redirect=${redirect}`
                    : '/register'}>Registrate</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen