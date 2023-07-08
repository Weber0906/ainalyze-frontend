import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import Particle from '../Particles';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const {signInWithGoogle} = useAuth()
    console.log(login)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/exchanges')
        } catch {
            setError('Failed to login')
        }
        setLoading(false)
    }

    async function handleSubmitGoogle(e) {
        e.preventDefault()
        try {
          setError("")
          setLoading(true)
          await signInWithGoogle()
          navigate("/exchanges")
        } catch {
          setError("Failed to create an account")
        }
    
        setLoading(false)
      }

    return (
        <>
        <Particle />
            <Card id='login' className='w-75 w-md-50 text-center mx-auto'>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className='w-100 w-md-50 mt-2' type='submit'>
                            Log In
                        </Button>
                    
                    <Button onClick={handleSubmitGoogle} disabled={loading} className='w-100 w-md-50 mt-2' type='submit'> 
                    <GoogleIcon className='mx-2'/>
                        Log In With Google
                        </Button>
                        </Form>
                    <div className='w=100 text-center mt-3'>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}